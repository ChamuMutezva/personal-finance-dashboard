import React from "react";
import Link from "next/link";
import { fetchBudgets, fetchByCategory } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Donut } from "../../ui/budget/Donut";
import { formatPosNegativeCurrency } from "@/lib/utils";
// import { Progress } from "@/components/ui/progress";
import Meter from "../../ui/budget/Meter";
import Image from "next/image";
import dayjs from "dayjs";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    // DialogClose,
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
    // AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import AddBudgetForm from "../../ui/budget/AddBudgetForm";
import { DeleteBudget } from "../../ui/budget/DeleteBudgetForm";
import { Separator } from "@/components/ui/separator";
import EditBudgetForm from "../../ui/budget/EditBudgetForm";
import SignOutForm from "@/app/ui/SignOutForm";

export default async function Page() {
    const budgets = await fetchBudgets();
    const category = await fetchByCategory();
    const {
        entertainmentCategory,
        billsCategory,
        diningCategory,
        personalCategory,
        groceriesCategory,
        generalCategory,
        shoppingCategory,
        educationCategory,
        lifestyleCategory,
        transportationCategory,
    } = category;

    // calculate  budget used for Entertainment
    const totalEntertainment = entertainmentCategory.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(-budget.amount);
        },
        0
    );

    // calculate  budget used for Bills
    const totalTransportation = transportationCategory.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(-budget.amount);
        },
        0
    );

    // calculate  budget used for lifestyle
    const totalLifestyle = lifestyleCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(-budget.amount);
    }, 0);

    // calculate  budget used for education
    const totalEducation = educationCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(-budget.amount);
    }, 0);

    // calculate  budget used for shopping
    const totalShopping = shoppingCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(-budget.amount);
    }, 0);

    // calculate  budget used for general
    const totalGeneral = generalCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(-budget.amount);
    }, 0);

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

    // calculate  budget used for Personal Care
    const totalGroceries = groceriesCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(-budget.amount);
    }, 0);

    const totals = [
        totalEntertainment,
        totalBills,
        totalDining,
        totalPersonal,
        totalGroceries,
        totalGeneral,
        totalEducation,
        totalShopping,
        totalLifestyle,
        totalTransportation,
    ];

    const data = budgets.map((budget, index) => ({
        id: budget.id,
        category: budget.category,
        maximum: budget.maximum,
        fill: budget.theme,
        amount: totals[index],
    }));
   

    return (
        <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-4"> 
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Budgets
                </h1>

                <SignOutForm />
                {/* Dialog component */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="default"
                            className={`focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
                        >
                            + Add New Budget{" "}
                            <span className="sr-only">item</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-11/12 sm:max-w-[35rem] rounded-xl">
                        <DialogHeader>
                            <DialogTitle>Add New Budget</DialogTitle>
                            <DialogDescription>
                                Choose a category to set a spending budget.
                                These categories can help you monitor spending.
                            </DialogDescription>
                        </DialogHeader>
                        <AddBudgetForm budgets={budgets} />
                    </DialogContent>
                </Dialog>
            </div>
            {data.length === 0 ? (
                <div>
                    <p>Add your budget list here!</p>
                </div>
            ) : (
                <div
                    className={`flex flex-col gap-4 lg:flex-row lg:items-start`}
                >
                    {/* Left side component */}
                    
                    <Donut
                        budgets={budgets}
                        totals={[
                            totalEntertainment,
                            totalBills,
                            totalDining,
                            totalPersonal,
                            totalGroceries,
                            totalEducation,
                            totalGeneral,
                            totalLifestyle,
                            totalShopping,
                            totalTransportation,
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
                                switch (budget.category) {
                                    case "Bills":
                                        return billsCategory;
                                    case "Dining Out":
                                        return diningCategory;
                                    case "Entertainment":
                                        return entertainmentCategory;
                                    case "Personal Care":
                                        return personalCategory;
                                    case "Groceries":
                                        return groceriesCategory;
                                    case "Education":
                                        return educationCategory;
                                    case "Transportation":
                                        return transportationCategory;
                                    case "Shopping":
                                        return shoppingCategory;
                                    case "Lifestyle":
                                        return lifestyleCategory;
                                    case "General":
                                        return generalCategory;
                                    default:
                                        return [];
                                }
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
                                                    backgroundColor:
                                                        budget.fill,
                                                }}
                                            />
                                            <span className="text-preset-2 font-bold ">
                                                {budget.category}
                                            </span>
                                        </h2>
                                        <Popover>
                                            <PopoverTrigger
                                                className={`p-2 focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                            hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
                                            >
                                                <Image
                                                    src="/assets/images/icon-ellipsis.svg"
                                                    alt=""
                                                    width={14}
                                                    height={4}
                                                />
                                                <span className="sr-only">
                                                    edit or delete 
                                                </span>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex relative flex-col gap-2 w-[134px] h-[91px] mr-8">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant={
                                                                "secondary"
                                                            }
                                                            className="p-0 m-0 bg-inherit text-[hsl(var(--grey-900))]
                                                         focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                          hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4"
                                                        >
                                                            Edit budget
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="w-11/12 sm:max-w-[35rem] rounded-xl">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Edit{" "}
                                                                {
                                                                    budget.category
                                                                }{" "}
                                                                Budget
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                As your budget
                                                                change, feel
                                                                free to update
                                                                your spending
                                                                limits
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <EditBudgetForm
                                                            id={budget.id}
                                                            budgets={budgets}
                                                        />
                                                    </DialogContent>
                                                </Dialog>

                                                <Separator />

                                                {/*DELETE DIALOG*/}
                                                <AlertDialog>
                                                    <AlertDialogTrigger
                                                        className="text-preset-4 m-0 p-0 bg-inherit text-[hsl(var(--red))]
                                                    focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                          hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4"
                                                    >
                                                        Delete budget
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="w-11/12 sm:max-w-[35rem] rounded-xl">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Delete
                                                                {` '${budget.category}'`}
                                                                ?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you
                                                                want to delete
                                                                this budget?
                                                                This action
                                                                cannot be
                                                                reversed and the
                                                                data in it will
                                                                be removed
                                                                forever
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                No, Go Back
                                                            </AlertDialogCancel>

                                                            <DeleteBudget
                                                                id={budget.id}
                                                            />
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
                                                    backgroundColor:
                                                        budget.fill,
                                                }}
                                            />
                                            <p
                                                id="meter-usage"
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
                                                    {budget.amount >
                                                    budget.maximum
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
                                                href={`/dashboard/transactions?page=1&query=${budget.category}`}
                                                className={`p-2 flex items-center gap-2 text-[hsl(var(--grey-500))] text-preset-4
                                                focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
                                            >
                                                See all{" "}
                                                <span className="sr-only">
                                                    list of transactions
                                                </span>
                                                <Image
                                                    src="/assets/images/icon-caret-right.svg"
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
            )}
        </main>
    );
}
