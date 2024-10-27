import { formatPosNegativeCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import React from "react";

function Summary({
    current,
    income,
    expenses,
}: Readonly<{
    current: number;
    income: number;
    expenses: number;
}>) {
    return (
        <section className="flex gap-2 flex-col sm:flex-row col-span-1 xl:col-span-12 xl:row-span-1 mb-4 xl:mb-0">
            <h2 className="sr-only">Summary</h2>
            <Card className="p-5 flex-1 bg-[hsl(var(--grey-900))]">
                <h3 className="text-preset-4 text-[hsl(var(--white))]">
                    Current balance
                </h3>
                <p className="text-preset-1 font-bold text-[hsl(var(--white))]">
                    {formatPosNegativeCurrency(current)}
                </p>
            </Card>
            <Card className="p-5 flex-1">
                <h3 className="text-preset-4 text-[hsl(var(--grey-500))]">
                    Income
                </h3>
                <p className="text-preset-1 font-bold text-[hsl(var(--grey-900))]">
                    {formatPosNegativeCurrency(income)}
                </p>
            </Card>
            <Card className="p-5 flex-1">
                <h3 className="text-preset-4 text-[hsl(var(--grey-500))]">
                    Expenses
                </h3>
                <p className="text-preset-1 font-bold text-[hsl(var(--grey-900))]">
                    {formatPosNegativeCurrency(expenses)}
                </p>
            </Card>
        </section>
    );
}

export default Summary;