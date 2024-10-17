"use client";

import * as React from "react";
import clsx from "clsx";
// import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Budget } from "../../lib/definitions";

import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    // CardHeader,
    //  CardTitle,
} from "@/components/ui/card";
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

export function DonutOverview({ budgets, totals }: Readonly<DonutProps>) {
    console.log(totals);

    const chartData = budgets.map((budget, index) => ({
        id: budget.id,
        category: budget.category,
        maximum: budget.maximum,
        fill: budget.theme,
        amount: totals[index],
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

    const colors = ["#277C78", "#82C9D7", "#F2CDAC", "#626070"];

    return (
        <Card className="flex flex-col sm:flex-row mt-4  lg:flex-1">
            <CardContent className="flex-1 pb-0 md:flex-1 ">
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
                className="left-side flex-col gap-2 text-sm items-start justify-center"
            >
                <h2 className="sr-only">
                    Spending summary
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-1 w-full">
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
                                        height: 50%; /* Adjust height */
                                        background-color: var(
                                            --pseudo-bg-color
                                        ); /* Use the custom property */
                                        border-radius: 0.5rem; /* Adjust border radius if needed */
                                    }
                                `}</style>
                                <div className="flex flex-col ">
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
