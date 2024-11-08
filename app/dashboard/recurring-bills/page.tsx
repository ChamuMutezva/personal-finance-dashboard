import React from "react";
import Image from "next/image";
import { fetchBills, fetchRecurringBills } from "@/lib/data";
import { Card } from "@/components/ui/card";
import SignOutForm from "@/app/ui/SignOutForm";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Suspense } from "react";
import { SkeletonLoader } from "@/app/ui/transactions/TransactionTableSkeleton";

export default async function Page({
    searchParams,
}: Readonly<{
    searchParams?: {
        query?: string;
        page?: string;
    };
}>) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const bills = await fetchBills();
    const data = await fetchRecurringBills();

    const totalBills = bills.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(budget.amount);
    }, 0);

    const paidBillsFilter = bills.filter((bill) => bill.recurring === false);
    const upcomingBillsFilter = bills.filter((bill) => bill.recurring === true);

    const totalPaidBillsFilter = paidBillsFilter.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(budget.amount);
        },
        0
    );

    const totalUpcomingBillsFilter = upcomingBillsFilter.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(budget.amount);
        },
        0
    );

    return (
        <>
            <div className="mb-4">
                <div className="flex w-full justify-between items-center mb-4">
                    <h1
                        className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                    >
                        Recurring bills
                    </h1>

                    <SignOutForm />
                </div>

                <div className="lg:flex items-start lg:gap-8">
                    <div
                        className={`flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start my-8`}
                    >
                        <div
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
                        </div>
                        <Card className="p-4 flex-1 w-full">
                            <h2>Summary</h2>
                            <div>
                                <p className="flex justify-between items-center gap-4">
                                    Paid bills{" "}
                                    <span>
                                        {paidBillsFilter.length}(R
                                        {-totalPaidBillsFilter})
                                    </span>
                                </p>
                                <p className="flex justify-between items-center gap-4">
                                    Total upcoming{" "}
                                    <span>
                                        {upcomingBillsFilter.length}(R
                                        {-totalUpcomingBillsFilter})
                                    </span>
                                </p>
                                <p className="flex justify-between items-center gap-4">
                                    Due soon
                                    <span>
                                        R
                                        {
                                            -(
                                                totalUpcomingBillsFilter -
                                                totalPaidBillsFilter
                                            )
                                        }
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
        </>
    );
}
