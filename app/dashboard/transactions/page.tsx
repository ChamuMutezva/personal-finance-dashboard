import { Suspense } from "react";
import { fetchTransactionsPages, fetchFilteredTransactions } from "@/lib/data";
import { SkeletonLoader } from "../../ui/transactions/TransactionTableSkeleton";
import Search from "../../ui/transactions/search";
import Pagination from "../../ui/transactions/Pagination";
import CategoryFilter from "../../ui/transactions/CategoryFilter";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { auth } from "@/auth";
import { Metadata } from "next";
import SortBy from "@/app/ui/transactions/SortBy";

export const metadata: Metadata = {
    title: "Transactions",
};

export default async function Page({
    searchParams,
}: Readonly<{
    searchParams?: {
        query?: string;
        page?: string;
        sortBy?: string;
    };
}>) {
    const session = await auth();
    const user = session?.user?.name;
    const query = searchParams?.query ?? "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchTransactionsPages(query);
    const sortBy = (searchParams?.sortBy as "Latest" | "Oldest" | "A to Z" | "Z to A" | "Highest" | "Lowest") ?? "Latest";
    const data = await fetchFilteredTransactions(query, currentPage, sortBy);

    return (
        <>
            <div className="flex w-full justify-between items-center">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Transactions
                </h1>
                <p className="text-xs md:text-sm text-[hsl(var(--grey-900))]">
                    {user} logged in
                </p>
                <div></div>
            </div>
            <div className={"w-full lg:mb-0"}>
                <div className="flex justify-between gap-2">
                    <Search placeholder="Search transactions" />
                    <SortBy />
                    <CategoryFilter />
                </div>
                <Suspense
                    key={query + currentPage}
                    fallback={<SkeletonLoader />}
                >
                    <DataTable columns={columns} data={data} sortBy={sortBy} />
                </Suspense>
                <div className="mt-5 mb-8 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </>
    );
}
