"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
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
}

export function Donut({ budgets }: DonutProps) {

    const chartData = budgets.map((budget) => ({
        id: budget.id,
        category: budget.category,
        maximum: budget.maximum,
        fill: budget.theme,
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
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Spending summary
                </div>
                <div className="leading-none text-muted-foreground">
                    {budgets.map((budget) => (
                        <div key={budget.id}>
                            <p className="flex justify-between items-center">
                                <span>{budget.category}</span>
                                <span>{budget.maximum}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}
