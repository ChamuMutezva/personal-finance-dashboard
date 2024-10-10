import React from "react";
import Image from "next/image";
import { fetchBills } from "../lib/data";
import { Card } from "@/components/ui/card";

export default async function Page() {
    const bills = await fetchBills();
    // console.log(bills);
    const totalBills = bills.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(budget.amount);
    }, 0);

    const paidBillsFilter = bills.filter((bill) => bill.recurring === false);
    const upcomingBillsFilter = bills.filter((bill) => bill.recurring === true);

    const totalPaidBillsFilter = paidBillsFilter.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(budget.amount);
    }, 0);

    const totalUpcomingBillsFilter = upcomingBillsFilter.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(budget.amount);
        },
        0
    );
    console.log(totalUpcomingBillsFilter);

    return (
        <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-8">
            <div className="mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Recurring bills
                </h1>

                <div
                    className={`flex flex-col gap-4 lg:flex-row lg:items-start`}
                >
                    <div
                        className={`bg-[hsl(var(--grey-900))] text-[hsl(var(--white))] rounded-xl p-4 flex items-center gap-4`}
                    >
                        <Image
                            src={"/assets/images/icon-recurring-bills.svg"}
                            height={17}
                            width={20}
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
                    <Card className="p-4">
                        <h2>Summary</h2>
                        <div>
                            <p className="flex justify-between items-center gap-4">
                                Paid bills <span>{paidBillsFilter.length}(R{-totalPaidBillsFilter})</span>
                            </p>
                            <p className="flex justify-between items-center gap-4">
                                Total upcoming{" "}
                                <span>{upcomingBillsFilter.length}(R{-totalUpcomingBillsFilter})</span>
                            </p>
                            <p>Due soon</p>
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    );
}
