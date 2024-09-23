import { Suspense } from "react";
import TransactionTable from "../ui/TransactionTable";

import Search from "../ui/search";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <main className="flex-1 flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
            <div className="flex w-full  items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Transactions
                </h1>
            </div>
            <div className={"w-full"}>
                <Search placeholder="Search transactions" />
                <Suspense key={query + currentPage}>
                    <TransactionTable query={query} currentPage={currentPage} />
                </Suspense>
            </div>
        </main>
    );
}
