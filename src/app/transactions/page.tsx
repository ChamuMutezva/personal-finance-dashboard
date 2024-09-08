import React from "react";
import { fetchTransactions } from "../lib/data";

export default async function Page() {
    const transactions = await fetchTransactions();
    console.log(transactions);
    return (
        <main className="flex-1 flex min-h-screen flex-col items-center justify-between lg:p-24">
            Transactions page
        </main>
    );
}
