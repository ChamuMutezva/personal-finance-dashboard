import React from "react";
import Link from "next/link";
import { fetchBudgets, fetchByCategory } from "../lib/data";
import { Donut } from "../ui/Donut";

export default async function Page() {
    const budgets = await fetchBudgets();
    const category = await fetchByCategory();
    const {
        entertainmentCategory,
        billsCategory,
        diningCategory,
        personalCategory,
    } = category;

    const totalEntertainment = entertainmentCategory.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(budget.amount);
        },
        0
    );

    const totalBills = billsCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(budget.amount);
    }, 0);

    const totalDining = diningCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(budget.amount);
    }, 0);

    const totalPersonal = personalCategory.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(budget.amount);
    }, 0);

    console.log(`Entertainment - ${totalEntertainment}`);
    console.log(`Bills - ${totalBills}`);
    console.log(`Dining - ${totalDining}`);
    console.log(`Personal - ${totalPersonal}`);
    console.log("end of transmission");
    return (
        <main className="flex-1 min-h-screen  p-4 lg:p-24">
            <div className="flex justify-between items-center mb-4">
                <h1 className={`text-preset-1`}>Budgets</h1>
                <Link
                    href={"/budgets/add-new-budget"}
                    className={`bg-[hsl(var(--grey-900))] text-[hsl(var(--white))] text-preset-4 font-bold rounded-lg p-4`}
                >
                    Add New Budget
                </Link>
            </div>
            <Donut budgets={budgets} />
        </main>
    );
}
