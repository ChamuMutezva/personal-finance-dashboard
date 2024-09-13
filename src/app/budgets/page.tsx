import React from "react";
import Link from "next/link";
import { fetchBudgets, fetchByCategory } from "../lib/data";
import { Donut } from "../ui/Donut";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

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

    /*
    console.log(`Entertainment - ${totalEntertainment}`);
    console.log(`Bills - ${totalBills}`);
    console.log(`Dining - ${totalDining}`);
    console.log(`Personal - ${totalPersonal}`);
    */
   // console.log(entertainmentCategory);
    console.log(billsCategory)
    console.log("end of transmission");
    console.log(calculateProgress(490.49, 750));
    return (
        <main className="flex-1 min-h-screen  px-4 pt-4 pb-16 lg:p-24">
            <div className="flex justify-between items-center mb-4">
                <h1 className={`text-preset-1`}>Budgets</h1>
                <Link
                    href={"/budgets/add-new-budget"}
                    className={`bg-[hsl(var(--grey-900))] text-[hsl(var(--white))] text-preset-4 font-bold rounded-lg p-4`}
                >
                    + Add New Budget
                </Link>
            </div>
            <div>
                <Donut
                    budgets={budgets}
                    totals={[
                        totalEntertainment,
                        totalBills,
                        totalDining,
                        totalPersonal,
                    ]}
                />

                <section title="a breakdown of the expenditure">
                    {data.map((budget) => {
                        const progressValue = calculateProgress(
                            budget.amount,
                            budget.maximum
                        );

                        return (
                            <div key={budget.id}>
                                <h2>{budget.category}</h2>
                                <p>Maximum of ${budget.maximum}</p>
                                <Progress
                                    role="meter"
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
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h3>Latest spending</h3>
                                        <button type="button" className="flex items-center gap-2">
                                            See all{" "}
                                            <Image
                                                src="assets/images/icon-caret-right.svg"
                                                alt=""
                                                width={6}
                                                height={11}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </main>
    );
}
