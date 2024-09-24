import { Suspense } from "react";
import TransactionTable from "../ui/TransactionTable";
import { fetchTransactionsPages } from "../lib/data";

import Search from "../ui/search";
import Pagination from "../ui/Pagination";

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
            <div className="flex w-full  items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Transactions
                </h1>
            </div>
            <div className={"w-full mb-20 lg:mb-0"}>
                <Search placeholder="Search transactions" />
                <Suspense key={query + currentPage}>
                    <TransactionTable query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </main>
    );
}
