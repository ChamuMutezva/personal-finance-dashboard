import { formatPosNegativeCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import React from "react";

function RecurringBills({
    totalPaidBillsFilterOverview,
    totalUpcomingBillsFilterOverview,
    totalBillsOverview,
}: Readonly<{
    totalPaidBillsFilterOverview: number;
    totalUpcomingBillsFilterOverview: number;
    totalBillsOverview: number;
}>) {
    return (
        <Card aria-label="recurring bills" className="p-4 xl:col-span-6 xl:col-start-8 xl:row-start-7 mb-4 xl:mb-0">
            <div className="flex items-center justify-between pb-4">
                <h2
                    className={`text-preset-3 text-[hsl(var(--grey-900))] font-bold`}
                >
                    Recurring bills
                </h2>
                <Link
                    href={`/dashboard/recurring-bills`}
                    className={`p-2 flex items-center gap-2 text-[hsl(var(--grey-500))] text-preset-4
                                    focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                    hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
                >
                    See all{" "}
                    <span className="sr-only">list of recurring bills</span>
                    <Image
                        src="assets/images/icon-caret-right.svg"
                        alt=""
                        width={6}
                        height={11}
                    />
                </Link>
            </div>
            <div className="flex flex-col gap-2">
                {/*Paid bills*/}
                <div className="p-5 border-l-4 border-[hsl(var(--green))] rounded-lg bg-[hsl(var(--beige-100))] dark:bg-[hsl(var(--beige-800))]">
                    <p className="flex justify-between text-preset-4 items-center">
                        Paid bills{" "}
                        <span className="font-bold">
                            {formatPosNegativeCurrency(
                                -totalPaidBillsFilterOverview
                            )}
                        </span>
                    </p>
                </div>
                {/*Upcoming bills*/}
                <div className="p-5 border-l-4 border-[hsl(var(--yellow))] rounded-lg bg-[hsl(var(--beige-100))]">
                    <p className="flex justify-between text-preset-4 items-center">
                        Total upcoming{" "}
                        <span className="font-bold">
                            {formatPosNegativeCurrency(
                                -totalUpcomingBillsFilterOverview
                            )}
                        </span>
                    </p>
                </div>
                {/*Due soon*/}
                <div className="p-5 border-l-4 border-[hsl(var(--cyan))] rounded-lg bg-[hsl(var(--beige-100))]">
                    <p className="flex justify-between text-preset-4 items-center">
                        Due soon{" "}
                        <span className="font-bold">
                            {formatPosNegativeCurrency(-totalBillsOverview)}
                        </span>
                    </p>
                </div>
            </div>
        </Card>
    );
}

export default RecurringBills;