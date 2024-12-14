import {
    fetchBalance,
    fetchBudgets,
    fetchByCategory,
    fetchPots,
    fetchBills,
} from "@/lib/data";

import PotsOverview from "../ui/home/Pots";
import TransactionTableOverview from "../ui/home/TransactionTableOverview";
import { DonutOverview } from "../ui/home/DonutOverview";
import RecurringBills from "../ui/home/RecurringBills";
import Summary from "../ui/home/Summary";
import { auth } from "@/auth";

export default async function Page({
    searchParams,
}: Readonly<{
    searchParams?: {
        query?: string;
        page?: string;
    };
}>) {
    const session = await auth();
    const user = session?.user?.name;
    const balance = await fetchBalance();
    const pots = await fetchPots();

    const amountSavedInPots = pots.reduce((accumulator, pot) => {
        return Number(accumulator) + Number(pot.total);
    }, 0);

    const query = searchParams?.query ?? "";
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
        <>
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Overview
                </h1>
                <p className="text-xs md:text-sm">{user} logged in</p>
                <div></div>
            </div>

            <div className="xl:grid items-start gap-4 xl:grid-cols-12 pb-8">
                {/* GRID CHILD 1 */}
                <Summary
                    current={balance[0].current}
                    income={balance[0].income}
                    expenses={balance[0].expenses}
                />
                {/* GRID CHILD 2 */}
                <PotsOverview
                    amountSavedInPots={amountSavedInPots}
                    pots={pots}
                />
                {/* GRID CHILD 3 */}
                <TransactionTableOverview
                    query={query}
                    currentPage={currentPage}
                />
                {/* GRID CHILD 4 */}
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
                {/* GRID CHILD 5 */}
                <RecurringBills
                    totalUpcomingBillsFilterOverview={
                        totalUpcomingBillsFilterOverview
                    }
                    totalBillsOverview={totalBillsOverview}
                    totalPaidBillsFilterOverview={totalPaidBillsFilterOverview}
                />
            </div>
        </>
    );
}
