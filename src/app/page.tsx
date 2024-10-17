import Image from "next/image";
import {
    fetchBalance,
    fetchBudgets,
    fetchByCategory,
    fetchPots,
    fetchTransactions,
    fetchBills,
} from "./lib/data";
import { Card } from "@/components/ui/card";
import { formatPosNegativeCurrency } from "./lib/utils";
import OverviewTable from "./ui/overview/OverviewTable";
import TransactionsHeader from "./ui/overview/TransactionsHeader";
import PotsHeader from "./ui/overview/PotsHeader";
import PotsMain from "./ui/overview/PotsMain";
import BudgetsHeader from "./ui/overview/BudgetsHeader";
import { DonutOverview } from "./ui/overview/DonutOverview";
import RecurringHeader from "./ui/overview/RecurringHeader";

export default async function Home() {
    const balance = await fetchBalance();
    const pots = await fetchPots();
    const transactions = await fetchTransactions();
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

    // BUDGET CALCULATIONS
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

    // RECURRING BILLS CALCULATIONS
    const bills = await fetchBills();
    const totalOverviewBills = bills.reduce((accumulator, budget) => {
        return Number(accumulator) + Number(budget.amount);
    }, 0);

    const paidBillsFilter = bills.filter((bill) => bill.recurring === false);
    const upcomingBillsFilter = bills.filter((bill) => bill.recurring === true);

    const totalPaidBillsFilter = paidBillsFilter.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(budget.amount);
        },
        0
    );

    const totalUpcomingBillsFilter = upcomingBillsFilter.reduce(
        (accumulator, budget) => {
            return Number(accumulator) + Number(budget.amount);
        },
        0
    );
    console.log(totalUpcomingBillsFilter);

    return (
        <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-8">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Overview
                </h1>
            </div>
            <section className="flex gap-2 flex-col sm:flex-row">
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
            <section aria-label="pots">
                <PotsHeader />
                <PotsMain pots={pots} />
            </section>
            <section aria-label="transactions">
                <TransactionsHeader />
                <OverviewTable transactions={transactions} />
            </section>
            <section aria-label="budgets">
                <BudgetsHeader />
                <div
                    className={`flex flex-col gap-4 lg:flex-row lg:items-start`}
                >
                    {/* Left side component */}
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
                </div>
            </section>
            <section aria-label="recurring bills">
                <RecurringHeader />
                <div>
                    <p className="flex justify-between items-center gap-4">
                        Paid bills{" "}
                        <span>
                            {paidBillsFilter.length}(R
                            {-totalPaidBillsFilter})
                        </span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                        Total upcoming{" "}
                        <span>
                            {upcomingBillsFilter.length}(R
                            {-totalUpcomingBillsFilter})
                        </span>
                    </p>
                    <p>Due soon</p>
                </div>
            </section>
        </main>
    );
}
