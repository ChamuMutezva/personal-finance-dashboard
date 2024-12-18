import React, { Suspense } from "react";
import Image from "next/image";
import { fetchRecurringBills } from "@/lib/data";
import { formatPosNegativeCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { SkeletonLoader } from "@/app/ui/transactions/TransactionTableSkeleton";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import { auth } from "@/auth";

// Extend dayjs with the isSameOrBefore plugin
dayjs.extend(isSameOrBefore);
// Extend dayjs with the isBetween plugin
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

export default async function Page({
    searchParams,
}: Readonly<{
    searchParams?: {
        query?: string;
        page?: string;
    };
}>) {
    const session = await auth();
    const user = session?.user?.name;
    const query = searchParams?.query ?? "";
    const currentPage = Number(searchParams?.page) || 1;

    const data = await fetchRecurringBills();

    const totalBills = data.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(budget.amount);
    }, 0);

    // Get today's date using Day.js
    const today = dayjs().startOf("day"); // Start of the day to compare only dates

    // Filter transactions that are not greater than today
    const filteredPaidTransactions = data.filter((transaction) => {
        // Parse the transaction date and compare it with today's date
        return dayjs(transaction.date).isSameOrBefore(today);
    });

    const totalPaidBills = filteredPaidTransactions.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(budget.amount);
        },
        0
    );

    // Get tomorrow's date and the date five days from now
    const tomorrow = dayjs().add(1, "day").startOf("day"); // Tomorrow at the start of the day
    const fiveDaysFromNow = dayjs().add(5, "day").endOf("day"); // Five days from now at the end of the day

    // Filter transactions that are due to be paid soon (tomorrow to five days from now)
    const dueSoonFilter = data.filter((transaction) => {
        const transactionDate = dayjs(transaction.date); // Parse the transaction date
        return transactionDate.isBetween(tomorrow, fiveDaysFromNow, null, "[]"); // Inclusive range
    });
    const dueSoonTotalPayments = dueSoonFilter.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(budget.amount);
    }, 0);

    const endOfMonth = dayjs().endOf("month"); // End of the current month
    // Filter transactions that have not been paid yet (from tomorrow to end of month)
    const upcomingPaymentsFilter = data.filter((transaction) => {
        const transactionDate = dayjs(transaction.date); // Parse the transaction date
        return (
            transactionDate.isSameOrAfter(tomorrow) &&
            transactionDate.isSameOrBefore(endOfMonth)
        );
    });
    const upcomingTotalPayments = upcomingPaymentsFilter.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(budget.amount);
        },
        0
    );

    return (
        <div className="mb-4">
            <div className="flex w-full justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Recurring bills
                </h1>
                <p className="text-xs md:text-sm">{user} logged in</p>
                <div></div>
            </div>

            <div className="lg:flex items-start lg:gap-8">
                <div
                    className={`flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start my-8 lg:my-0`}
                >
                    <Card
                        className={`bg-[hsl(var(--grey-900))] text-[hsl(var(--white))] rounded-xl p-4 flex-1
                                 flex items-center gap-4 lg:min-w-[21rem] lg:flex-col lg:items-start`}
                    >
                        <Image
                            src={"/assets/images/icon-recurring-bills.svg"}
                            height={28}
                            width={32}
                            alt="recurring bills"
                        />
                        <p
                            className={`flex flex-col justify-center items-start`}
                        >
                            Total bills{" "}
                            <span className={`text-preset-1`}>
                                R{-totalBills}
                            </span>
                        </p>
                    </Card>
                    <Card className="p-4 flex-1 w-full">
                        <h2 className="text-preset-2 font-bold pb-4">
                            Summary
                        </h2>
                        <div className="flex flex-col gap-4">
                            <p className="flex justify-between items-center gap-4 border-b pb-2 border-gray-300">
                                Paid bills{" "}
                                <span className="font-bold">
                                    {filteredPaidTransactions.length}(R
                                    {formatPosNegativeCurrency(-totalPaidBills)}
                                    )
                                </span>
                            </p>
                            <p className="flex justify-between items-center gap-4 border-b pb-2 border-gray-300">
                                Total upcoming{" "}
                                <span className="font-bold">
                                    {upcomingPaymentsFilter.length}(R
                                    {formatPosNegativeCurrency(
                                        -upcomingTotalPayments
                                    )}
                                    )
                                </span>
                            </p>
                            <p className="flex justify-between items-center text-preset-4 text-[hsl(var(--red))] pb-2 gap-4">
                                Due soon{" "}
                                <span className="font-bold">
                                    {dueSoonFilter.length} (R
                                    {formatPosNegativeCurrency(
                                        -dueSoonTotalPayments
                                    )}
                                    )
                                </span>
                            </p>
                        </div>
                    </Card>
                </div>
                <div className="w-full mb-10">
                    <Suspense
                        key={query + currentPage}
                        fallback={<SkeletonLoader />}
                    >
                        <DataTable columns={columns} data={data} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
