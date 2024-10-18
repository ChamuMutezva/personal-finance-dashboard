import Image from "next/image";
import { fetchBalance, fetchPots, fetchTransactionsPages } from "./lib/data";
import { Card } from "@/components/ui/card";
import { formatPosNegativeCurrency } from "./lib/utils";
import Link from "next/link";
import PotsOverview from "./ui/home/Pots";
import TransactionTable from "./ui/transactions/TransactionTable";

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
    const totalPages = await fetchTransactionsPages(query);
    return (
        <main className="flex-1 min-h-screen px-4 pt-6 pb-16 md:px-10 lg:p-8">
            <div className="flex justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Overview
                </h1>
            </div>
            <div className="grid gap-4">
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
                <PotsOverview
                    amountSavedInPots={amountSavedInPots}
                    pots={pots}
                />
                <Card className="p-4">
                    <div className="flex items-center justify-between pb-4">
                        <h2
                            className={`text-preset-3 text-[hsl(var(--grey-900))] font-bold`}
                        >
                            Transactions
                        </h2>
                        <Link
                            href={`/transactions`}
                            className={`p-2 flex items-center gap-2 text-[hsl(var(--grey-500))] text-preset-4
                                                    focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                    hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
                        >
                            See all{" "}
                            <span className="sr-only">list of pots</span>
                            <Image
                                src="assets/images/icon-caret-right.svg"
                                alt=""
                                width={6}
                                height={11}
                            />
                        </Link>
                    </div>
                    <TransactionTable query={query} currentPage={currentPage} />
                </Card>
            </div>
        </main>
    );
}
