"use client";

import * as React from "react";
import clsx from "clsx";
import { Label, Pie, PieChart } from "recharts";
import { Budget } from "@/lib/definitions";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";

export const description = "Budget representation using donut chart";

interface DonutProps {
    budgets: Budget[];
    totals: number[];
}

export function DonutOverview({ budgets, totals }: Readonly<DonutProps>) {
    const chartData = budgets?.map((budget, index) => ({
        id: budget.id,
        category: budget.category,
        maximum: Number(budget.maximum),
        fill: budget.theme,
        amount: Number(totals[index]),
    }));
    
    const chartConfig = {
        maximum: {
            label: "Maximum",
        },
        bills: {
            label: "Bills",
            color: "hsl(var(--chart-1))",
        },
        dining: {
            label: "Dining out",
            color: "hsl(var(--chart-2))",
        },
        entertainment: {
            label: "Entertainment",
            color: "hsl(var(--chart-3))",
        },
        personalCare: {
            label: "Personal Care",
            color: "hsl(var(--chart-4))",
        },
        other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
        },
    } satisfies ChartConfig;
    const totalBudget = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.maximum, 0);
    }, [chartData]);

    const usage = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.amount, 0);
    }, [chartData]);

    return (
        <Card className="grid sm:grid-cols-3 lg:flex-col lg:col-span-5 lg:row-start-2 lg:row-span-5 lg:col-start-8 mb-4 xl:mb-0">
            <CardHeader className="flex col-span-3 flex-row justify-between items-center pb-0 w-full">
                <CardTitle>Budgets</CardTitle>
                <Link
                    href={`/dashboard/budgets`}
                    className={`p-2 flex items-center gap-2 text-[hsl(var(--grey-500))] text-preset-4
                                                    focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                    hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
                >
                    See all <span className="sr-only">list of budgets</span>
                    <Image
                        src="assets/images/icon-caret-right.svg"
                        alt=""
                        width={6}
                        height={11}
                    />
                </Link>
            </CardHeader>
            <CardContent className="flex-1 col-span-3 sm:col-span-2 pb-0 md:flex-1">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[310px]"
                >
                    <PieChart
                        accessibilityLayer
                        role="img"
                        aria-label="summary visual presentation of budget and spending"
                        aria-describedby="total-used total-budget chart-description"
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="maximum"
                            nameKey="category"
                            innerRadius={70}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    id="total-used"
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    ${usage.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    id="total-budget"
                                                    className="fill-muted-foreground"
                                                >
                                                    of $
                                                    {totalBudget.toLocaleString()}{" "}
                                                    limit
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter
                id="chart-description"
                className="left-side col-span-3 sm:col-span-1 flex-col gap-2 text-sm  justify-center items-start md:flex-1"
            >
                <h2 className="sr-only">Spending summary</h2>
                <div className="grid grid-cols-2 sm:grid-cols-1 w-full">
                    {chartData.slice(0, 3).map((budget) => {
                        return (
                            <div
                                key={budget.id}
                                className={clsx(
                                    `py-4 last:border-b-0 border-[hsl(var(--grey-100))] relative`
                                )}
                                style={
                                    {
                                        // Use a CSS string to set the before pseudo-element's background color
                                        "--pseudo-bg-color": budget.fill, // Set a custom property
                                    } as React.CSSProperties
                                }
                            >
                                <style jsx>{`
                                    div::before {
                                        content: "";
                                        position: absolute;
                                        left: -1rem;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        width: 0.25rem; /* Adjust width */
                                        height: 50%; /* Adjust height */
                                        background-color: var(
                                            --pseudo-bg-color
                                        ); /* Use the custom property */
                                        border-radius: 0.5rem; /* Adjust border radius if needed */
                                    }
                                `}</style>
                                <div className="flex flex-col">
                                    <p className="text-preset-4 text-[hsl(var(--grey-500))]">
                                        {budget.category}
                                    </p>
                                    <p className="text-preset-3 font-bold text-[hsl(var(--grey-900))]">
                                        ${budget.amount}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardFooter>
        </Card>
    );
}
