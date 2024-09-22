import React from "react";
import { fetchTransactions } from "../lib/data";

export default async function Page() {
    const transactions = await fetchTransactions();
    console.log(transactions);
    return (
        <main className="flex-1 flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
            <div className="flex w-full  items-center mb-4">
                <h1
                    className={`text-preset-1 font-bold text-[hsl(var(--grey-900))]`}
                >
                    Transactions
                </h1>
            </div>
            <div className={`flex flex-col gap-4 lg:flex-row lg:items-start`}> 
                
            </div>
        </main>
    );
}
