import React from "react";
import Link from "next/link";
import { fetchBudgets, fetchByCategory } from "../lib/data";
import { deleteBudget } from "../lib/actions";
import { Card } from "@/components/ui/card";
import { Donut } from "../ui/budget/Donut";
import { formatPosNegativeCurrency } from "../lib/utils";
// import { Progress } from "@/components/ui/progress";
import Meter from "../ui/budget/Meter";
import Image from "next/image";
import dayjs from "dayjs";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import AddBudgetForm from "../ui/budget/AddBudgetForm";
import EditBudgetForm from "../ui/budget/EditBudgetForm";
import { DeleteBudget } from "../ui/budget/DeleteBudgetForm";
import { Separator } from "@/components/ui/separator";
import { revalidatePath } from "next/cache";

export default async function Page() {
    const budgets = await fetchBudgets();
    const category = await fetchByCategory();
    const {
        entertainmentCategory,
        billsCategory,
        diningCategory,
        personalCategory,
    } = category;

    // calculate  budget used for Entertainment
    const totalEntertainment = entertainmentCategory.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(-budget.amount);
        },
        0
    );

    // calculate  budget used for Bills
    const totalBills = billsCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(-budget.amount);
    }, 0);

    // calculate  budget used for Dining Out
    const totalDining = diningCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(-budget.amount);
    }, 0);

    // calculate  budget used for Personal Care
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

    const handleDelete = async (id: string) => {
        console.log(id);
        // await deleteBudget.bind(null, id)
        // await deleteBudget(id); // Call your delete function
        // Optionally revalidate or redirect after deletion
        revalidatePath("/budgets");
    };

    // console.log(billsCategory);
    // console.log("end of transmission");
    // console.log(calculateProgress(490.49, 750));

    console.log(budgets);

    return (
        <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-8">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Budgets
                </h1>
                {/* Dialog component */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default">
                            + Add New Budget{" "}
                            <span className="sr-only">item</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-11/12 sm:max-w-[425px] rounded-xl">
                        <DialogHeader>
                            <DialogTitle>Add New Budget</DialogTitle>
                            <DialogDescription>
                                Choose a category to set a spending budget.
                                These categories can help you monitor spending.
                            </DialogDescription>
                        </DialogHeader>
                        <AddBudgetForm budgets={budgets} />
                        {/*
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                        */}
                    </DialogContent>
                </Dialog>
            </div>

            <div className={`flex flex-col gap-4 lg:flex-row lg:items-start`}>
                {/* Left side component */}
                <Donut
                    budgets={budgets}
                    totals={[
                        totalEntertainment,
                        totalBills,
                        totalDining,
                        totalPersonal,
                    ]}
                />

                {/* Right side component */}
                <section
                    title="a breakdown of the expenditure"
                    className={`right-side flex flex-col mt-4 lg:flex-1 gap-4`}
                >
                    {data.map((budget) => {
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
                            <Card
                                key={budget.id}
                                className="rounded-xl py-6 px-5 flex flex-col gap-4"
                            >
                                <div className="flex justify-between items-center relative">
                                    <h2
                                        className={`flex justify-center items-center gap-4 relative`}
                                    >
                                        <span
                                            className={`w-4 h-4 inline-block rounded-full`}
                                            style={{
                                                backgroundColor: budget.fill,
                                            }}
                                        />
                                        <span className="text-preset-2 font-bold ">
                                            {budget.category}
                                        </span>
                                    </h2>
                                    <Popover>
                                        <PopoverTrigger>
                                            {" "}
                                            <Image
                                                src="assets/images/icon-ellipsis.svg"
                                                alt=""
                                                width={14}
                                                height={4}
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent className="flex relative flex-col gap-2 w-[134px] h-[91px] mr-8">
                                            <Link
                                                // variant="link"
                                                href={`/budgets/${budget.id}/edit`}
                                                className="m-0 p-0 bg-inherit text-[hsl(var(--grey-900))]"
                                            >
                                                Edit budget
                                            </Link>
                                            {/*
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Link
                                                        // variant="link"
                                                        href={`/budgets/${budget.id}/edit`}
                                                        className="m-0 p-0 bg-inherit text-[hsl(var(--grey-900))]"
                                                    >
                                                        Edit budget
                                                    </Link>
                                                </DialogTrigger>
                                                <DialogContent className="w-11/12 sm:max-w-[425px] rounded-xl">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Edit{" "}
                                                            {budget.category}{" "}
                                                            Budget
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            As your budget
                                                            change, feel free to
                                                            update your spending
                                                            limits
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <EditBudgetForm
                                                        id={budget.id}
                                                        budgets={budgets}
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                            */}
                                            <Separator />
                                            
                                            {/*DELETE DIALOG*/}
                                            <AlertDialog>
                                                <AlertDialogTrigger className="text-preset-4 m-0 p-0 bg-inherit text-[hsl(var(--red))]">
                                                    Delete budget
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Are you absolutely
                                                            sure?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot
                                                            be undone. This will
                                                            permanently delete
                                                            your account and
                                                            remove your data
                                                            from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction type="submit">
                                                            <DeleteBudget
                                                                id={budget.id}
                                                            />
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <p
                                    className={`text-preset-4 text-[hsl(var(--grey-500))] font-normal`}
                                >
                                    Maximum of ${budget.maximum}
                                </p>

                                <Meter
                                    value={budget.amount}
                                    min={0}
                                    max={budget.maximum}
                                    color={budget.fill}
                                />

                                <div className="flex items-center spending">
                                    <div className="flex items-center flex-1 gap-2">
                                        <span
                                            className={`w-1 h-10 inline-block rounded-sm`}
                                            style={{
                                                backgroundColor: budget.fill,
                                            }}
                                        />
                                        <p
                                            id="category-usage"
                                            className="flex flex-col flex-1"
                                        >
                                            Spent{" "}
                                            <span>
                                                ${budget.amount.toFixed(2)}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center flex-1 gap-2">
                                        <span
                                            className={`w-1 h-10 inline-block rounded-sm bg-[hsl(var(--beige-100))]`}
                                        />
                                        <p className="flex flex-col">
                                            Free{" "}
                                            <span>
                                                $
                                                {budget.amount > budget.maximum
                                                    ? 0
                                                    : (
                                                          budget.maximum -
                                                          budget.amount
                                                      ).toFixed(2)}
                                            </span>
                                        </p>
                                    </div>
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
                                            <span className="sr-only">
                                                list of transactions
                                            </span>
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
                                                    `flex justify-between border-b-[1px] py-4 last:border-b-0 border-[hsl(var(--beige-500))]`
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
                                                        {formatPosNegativeCurrency(
                                                            item.amount
                                                        )}
                                                    </p>
                                                    <p
                                                        className={`text-preset-5 font-normal text-[hsl(var(--grey-500))]`}
                                                    >
                                                        <time
                                                            dateTime={dayjs(
                                                                item.date
                                                            ).format(
                                                                "D MMM YYYY"
                                                            )}
                                                        >
                                                            {dayjs(
                                                                item.date
                                                            ).format(
                                                                "D MMM YYYY"
                                                            )}
                                                        </time>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </Card>
                        );
                    })}
                </section>
            </div>
        </main>
    );
}
