"use client";

import * as React from "react";
import clsx from "clsx";
import { Label, Pie, PieChart } from "recharts";
import { Budget } from "@/lib/definitions";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Budget representation using donut chart";

interface DonutProps {
    budgets: Budget[];
    totals: number[];
}

export function Donut({ budgets, totals }: Readonly<DonutProps>) {
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
        <Card className="flex flex-col md:flex-row mt-4 lg:flex-col lg:flex-1">
            <CardContent className="flex-1 pb-0 md:flex-1 lg:flex-none">
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
                            outerRadius={100}
                            innerRadius={90}
                        ></Pie>
                        <Pie
                            data={chartData}
                            dataKey="maximum"
                            nameKey="category"
                            innerRadius={100}
                            outerRadius={120}
                            strokeWidth={5}
                            opacity={0.7}
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
                className="left-side flex-col gap-2 text-sm items-start md:flex-1"
            >
                <h2 className="text-left -ml-4 capitalize text-preset-2 font-bold py-4 text-[hsl(var(--grey-900))]">
                    Spending summary
                </h2>
                <div className="flex flex-col  w-full">
                    {chartData.map((budget) => {
                        return (
                            <div
                                key={budget.id}
                                className={clsx(
                                    `border-b-2 py-4 last:border-b-0 border-[hsl(var(--grey-100))] relative`
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
                                        left: -1rem; /* Adjust as needed */
                                        top: 50%;
                                        transform: translateY(-50%);
                                        width: 0.25rem; /* Adjust width */
                                        height: 40%; /* Adjust height */
                                        background-color: var(
                                            --pseudo-bg-color
                                        ); /* Use the custom property */
                                        border-radius: 0.5rem; /* Adjust border radius if needed */
                                    }
                                `}</style>
                                <div className="flex justify-between items-center gap-4">
                                    <p className="text-preset-4 text-[hsl(var(--grey-500))]">
                                        {budget.category}
                                    </p>
                                    <p className="text-preset-3 font-bold text-[hsl(var(--grey-900))]">
                                        ${budget.amount}{" "}
                                        <span className="text-preset-5 text-[hsl(var(--grey-500))] font-normal">
                                            of ${budget.maximum}
                                        </span>
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
