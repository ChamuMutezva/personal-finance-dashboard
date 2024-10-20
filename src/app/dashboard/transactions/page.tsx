import { Suspense } from "react";
import TransactionTable from "../../ui/transactions/TransactionTable";
import { fetchTransactionsPages } from "../../lib/data";
import { SkeletonLoader } from "../../ui/transactions/TransactionTableSkeleton";

import Search from "../../ui/transactions/search";
import Pagination from "../../ui/transactions/Pagination";
import CategoryFilter from "../../ui/transactions/CategoryFilter";
import SignOutForm from "@/app/ui/sign-out-form";

export default async function Page({
    searchParams,
}: Readonly<{
    searchParams?: {
        query?: string;
        page?: string;
    };
}>) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchTransactionsPages(query);

    return (
        <main className="flex-1 min-h-screen flex-col items-center justify-between px-4 pt-6 md:px-10 lg:p-8">
            <div className="flex w-full justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Transactions
                </h1>
                <SignOutForm />
            </div>
            <div className={"w-full mb-20 lg:mb-0"}>
                <div className="flex gap-2">
                    <Search placeholder="Search transactions" />
                    <CategoryFilter />
                </div>
                <Suspense
                    key={query + currentPage}
                    fallback={<SkeletonLoader />}
                >
                    <TransactionTable query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </main>
    );
}
