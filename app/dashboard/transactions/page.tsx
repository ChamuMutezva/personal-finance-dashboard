import { Suspense } from "react";
// import TransactionTable from "../../ui/transactions/TransactionTable";
import { fetchTransactionsPages, fetchFilteredTransactions } from "@/lib/data";
import { SkeletonLoader } from "../../ui/transactions/TransactionTableSkeleton";
import Search from "../../ui/transactions/search";
import Pagination from "../../ui/transactions/Pagination";
import CategoryFilter from "../../ui/transactions/CategoryFilter";
import SignOutForm from "@/app/ui/SignOutForm";
import { DataTable } from "./data-table";
import {columns} from "./columns"
// import { Transaction } from "@/lib/definitions";

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
    const data = await fetchFilteredTransactions(query, currentPage)

    return (
        <>
            <div className="flex w-full justify-between items-center">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Transactions
                </h1>
                <SignOutForm />
            </div>
            <div className={"w-full pb-10 lg:mb-0"}>
                <div className="flex justify-between gap-2">
                    <Search placeholder="Search transactions" />                    
                    <CategoryFilter />
                </div>
                <Suspense
                    key={query + currentPage}
                    fallback={<SkeletonLoader />}
                >
                   {/* <TransactionTable query={query} currentPage={currentPage} /> */}
                    <DataTable columns={columns} data={data} />
                </Suspense>
                <div className="mt-5 mb-8 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </>
    );
}
