"use client";

import * as React from "react";
// import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Budget } from "../lib/definitions";

import {
    Card,
    CardContent,
    CardDescription,
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

export const description = "Budget representation using donut chart";

interface DonutProps {
    budgets: Budget[];
    totals: number[];
}

export function Donut({ budgets, totals }: DonutProps) {
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
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Summary of expenses</CardTitle>
                <CardDescription>August - September 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="maximum"
                            nameKey="category"
                            innerRadius={60}
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
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalBudget.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Budget
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
            <CardFooter className="flex-col gap-2 text-sm items-start">
                <h3 className="text-left text-preset-2 font-bold py-4 text-[hsl(var(--grey-900))]">
                    Spending summary
                </h3>
                <div className="flex flex-col  w-full">
                    {chartData.map((budget) => {
                        return (
                            <div
                                key={budget.id}
                                className={`border-b-2 py-4 last:border-b-0 border-[hsl(var(--grey-100))] relative
                            before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-1
                             before:h-2/5 before:bg-[hsl(var(--green))] before:rounded-t-xl before:rounded-b-xl`}
                            >
                                <div className="flex justify-between items-center gap-4">
                                    <p className="text-preset-4 text-[hsl(var(--grey-500))]">
                                        {budget.category}
                                    </p>
                                    <p className="text-preset-3 font-bold text-[hsl(var(--grey-900))]">
                                        {-budget.amount}{" "}
                                        <span className="text-preset-5 text-[hsl(var(--grey-500))] font-normal">
                                            of {budget.maximum}
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
