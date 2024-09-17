import React from "react";
import Link from "next/link";
import { fetchBudgets, fetchByCategory } from "../lib/data";
import { Donut } from "../ui/Donut";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import dayjs from "dayjs";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddBudgetForm from "../ui/AddBudgetForm";

export default async function Page() {
    const budgets = await fetchBudgets();
    const category = await fetchByCategory();
    const {
        entertainmentCategory,
        billsCategory,
        diningCategory,
        personalCategory,
    } = category;

    // calculate budgets amount (amount currently used)
    const totalEntertainment = entertainmentCategory.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(-budget.amount);
        },
        0
    );

    const totalBills = billsCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(-budget.amount);
    }, 0);

    const totalDining = diningCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(-budget.amount);
    }, 0);

    const totalPersonal = personalCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(-budget.amount);
    }, 0);

    const totals = [totalEntertainment, totalBills, totalDining, totalPersonal];

    const data = budgets.map((budget, index) => ({
        id: budget.id,
        category: budget.category,
        maximum: budget.maximum,
        fill: budget.theme,
        amount: totals[index],
    }));

    function calculateProgress(currentProgress: number, total: number) {
        return Math.round((currentProgress / total) * 100);
    }

    console.log(billsCategory);
    console.log("end of transmission");
    console.log(calculateProgress(490.49, 750));

    return (
        <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-8">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Budgets
                </h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default">
                            + Add New Budget{" "}
                            <span className="sr-only">item</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Budget</DialogTitle>
                            <DialogDescription>
                                Choose a category to set a spending budget.
                                These categories can help you monitor spending.
                            </DialogDescription>
                        </DialogHeader>
                        <AddBudgetForm />
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
               
            </div>
            <div className={`flex flex-col gap-4 lg:flex-row lg:items-start`}>
                <Donut
                    budgets={budgets}
                    totals={[
                        totalEntertainment,
                        totalBills,
                        totalDining,
                        totalPersonal,
                    ]}
                />

                <section
                    title="a breakdown of the expenditure"
                    className={`right-side flex flex-col lg:flex-1 gap-4`}
                >
                    {data.map((budget) => {
                        const progressValue = calculateProgress(
                            budget.amount,
                            budget.maximum
                        );

                        // Filter the bills category based on the current budget category
                        function filteredItems() {
                            if (budget.category === "Bills") {
                                return billsCategory;
                            } else if (budget.category === "Dining Out") {
                                return diningCategory;
                            } else if (budget.category === "Entertainment") {
                                return entertainmentCategory;
                            } else if (budget.category === "Personal Care") {
                                return personalCategory;
                            } else return [];
                        }

                        return (
                            <div
                                key={budget.id}
                                className="bg-[hsl(var(--white))] rounded-xl py-6 px-5 flex flex-col gap-4"
                            >
                                <h2 className={`text-preset-2 font-bold`}>
                                    {budget.category}
                                </h2>
                                <p
                                    className={`text-preset-4 text-[hsl(var(--grey-500))] font-normal`}
                                >
                                    Maximum of ${budget.maximum}
                                </p>
                                <Progress
                                    value={progressValue}
                                    className={`h-6 rounded`}
                                    style={{ backgroundColor: budget.fill }}
                                />
                                <div className="flex items-center spending">
                                    <p className="flex flex-col flex-1">
                                        Spent <span>${budget.amount}</span>
                                    </p>
                                    <p className="flex flex-1 flex-col">
                                        Free{" "}
                                        <span>
                                            $
                                            {budget.amount > budget.maximum
                                                ? 0
                                                : budget.maximum -
                                                  budget.amount}
                                        </span>
                                    </p>
                                </div>
                                <div
                                    className={`bg-[hsl(var(--beige-100))] p-4 rounded-xl`}
                                >
                                    <div className="flex items-center justify-between pb-4">
                                        <h3
                                            className={`text-preset-3 text-[hsl(var(--grey-900))] font-bold`}
                                        >
                                            Latest spending
                                        </h3>
                                        <Link
                                            href={"/transactions"}
                                            className="flex items-center gap-2 text-[hsl(var(--grey-500))] text-preset-4"
                                        >
                                            See all{" "}
                                            <Image
                                                src="assets/images/icon-caret-right.svg"
                                                alt=""
                                                width={6}
                                                height={11}
                                            />
                                        </Link>
                                    </div>
                                    {filteredItems()
                                        .slice(0, 3)
                                        .map((item) => (
                                            <div
                                                key={item.id}
                                                className={clsx(
                                                    `flex justify-between border-b-[1px] py-4 last:border-b-0 border-[hsl(var(--grey-500))]`
                                                )}
                                            >
                                                <div>
                                                    <Image
                                                        src={item.avatar}
                                                        width={32}
                                                        height={32}
                                                        alt=""
                                                        className="rounded-[50%]"
                                                        unoptimized
                                                    />
                                                    <h4
                                                        className={`text-preset-5 font-bold text-[hsl(var(--grey-900))]`}
                                                    >
                                                        {item.name}
                                                    </h4>
                                                </div>
                                                <div className="flex flex-col justify-end items-end">
                                                    <p
                                                        className={`text-preset-5 font-bold text-[hsl(var(--grey-900))]`}
                                                    >
                                                        {item.amount}
                                                    </p>
                                                    <p
                                                        className={`text-preset-5 font-normal text-[hsl(var(--grey-500))]`}
                                                    >
                                                        {dayjs(
                                                            item.date
                                                        ).format("D MMM YYYY")}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </main>
    );
}
