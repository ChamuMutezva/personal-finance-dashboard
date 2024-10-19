import Image from "next/image";
import {
    fetchBalance,
    fetchBudgets,
    fetchByCategory,
    fetchPots,
    fetchBills,
} from "./lib/data";
import { Card } from "@/components/ui/card";
import { formatPosNegativeCurrency } from "./lib/utils";
import Link from "next/link";
import PotsOverview from "./ui/home/Pots";
import { DonutOverview } from "./ui/home/DonutOverview";
import TransactionTableOverview from "./ui/home/TransactionsTableOverview";
import RecurringBills from "./ui/home/RecurringBills";

export default async function Home({
    searchParams,
}: Readonly<{
    searchParams?: {
        query?: string;
        page?: string;
    };
}>) {
    const balance = await fetchBalance();
    const pots = await fetchPots();

    const amountSavedInPots = pots.reduce((accumulator, pot) => {
        return Number(accumulator) + Number(pot.total);
    }, 0);

    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
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

    const bills = await fetchBills();

    const totalBillsOverview = bills.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(budget.amount);
    }, 0);

    const paidBillsFilterOverview = bills.filter(
        (bill) => bill.recurring === false
    );
    const upcomingBillsFilter = bills.filter((bill) => bill.recurring === true);

    const totalPaidBillsFilterOverview = paidBillsFilterOverview.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(budget.amount);
        },
        0
    );

    const totalUpcomingBillsFilterOverview = upcomingBillsFilter.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(budget.amount);
        },
        0
    );

    return (
        <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-4">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Overview
                </h1>
            </div>
            <div className="xl:grid items-start gap-4 xl:grid-cols-12">
                <section className="flex gap-2 flex-col sm:flex-row col-span-1 xl:col-span-12 xl:row-span-1 mb-4 xl:mb-0">
                    <h2 className="sr-only">Summary</h2>
                    <Card className="p-5 flex-1 bg-[hsl(var(--grey-900))]">
                        <h3 className="text-preset-4 text-[hsl(var(--white))]">
                            Current balance
                        </h3>
                        <p className="text-preset-1 font-bold text-[hsl(var(--white))]">
                            {formatPosNegativeCurrency(balance[0].current)}
                        </p>
                    </Card>
                    <Card className="p-5 flex-1">
                        <h3 className="text-preset-4 text-[hsl(var(--grey-500))]">
                            Income
                        </h3>
                        <p className="text-preset-1 font-bold text-[hsl(var(--grey-900))]">
                            {formatPosNegativeCurrency(balance[0].income)}
                        </p>
                    </Card>
                    <Card className="p-5 flex-1">
                        <h3 className="text-preset-4 text-[hsl(var(--grey-500))]">
                            Expenses
                        </h3>
                        <p className="text-preset-1 font-bold text-[hsl(var(--grey-900))]">
                            {formatPosNegativeCurrency(balance[0].expenses)}
                        </p>
                    </Card>
                </section>
                <PotsOverview
                    amountSavedInPots={amountSavedInPots}
                    pots={pots}
                />

                <TransactionTableOverview
                    query={query}
                    currentPage={currentPage}
                />

                <DonutOverview
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
                <RecurringBills
                    totalUpcomingBillsFilterOverview={
                        totalUpcomingBillsFilterOverview
                    }
                    totalBillsOverview={totalBillsOverview}
                    totalPaidBillsFilterOverview={totalPaidBillsFilterOverview}
                />
            </div>
        </main>
    );
}
