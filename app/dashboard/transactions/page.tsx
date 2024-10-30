import { Suspense } from "react";
import TransactionTable from "../../ui/transactions/TransactionTable";
import { fetchTransactionsPages } from "@/lib/data";
import { SkeletonLoader } from "../../ui/transactions/TransactionTableSkeleton";
import SortBy from "@/app/ui/transactions/SortBy";
import Search from "../../ui/transactions/search";
import Pagination from "../../ui/transactions/Pagination";
import CategoryFilter from "../../ui/transactions/CategoryFilter";
import SignOutForm from "@/app/ui/SignOutForm";

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
        <>
            <div className="flex w-full justify-between items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Transactions
                </h1>
                <SignOutForm />
            </div>
            <div className={"w-full pb-10 lg:mb-0"}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Search placeholder="Search transactions" />
                    <SortBy />
                    <CategoryFilter />
                </div>
                <Suspense
                    key={query + currentPage}
                    fallback={<SkeletonLoader />}
                >
                    <TransactionTable query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 mb-8 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </>
    );
}
