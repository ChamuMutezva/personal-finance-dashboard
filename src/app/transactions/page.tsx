import React from "react";
import { fetchTransactions } from "../lib/data";
import dayjs from "dayjs";
import Image from "next/image";
import { formatPosNegativeCurrency } from "../lib/utils";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function Page() {
    const transactions = await fetchTransactions();
    console.log(transactions);
    const totals = transactions.reduce((accumulator, transaction) => {
        return Number(accumulator) + Number(transaction.amount);
    }, 0);
    console.log(formatPosNegativeCurrency(totals));
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
                <Table>
                    <TableCaption>A list of my transactions.</TableCaption>
                    <TableHeader>
                        <TableRow className="hidden md:contents">
                            <TableHead>Recipient/Sender</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Transaction Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="font-medium flex justify-start gap-2 items-center">
                                    <Image
                                        src={transaction.avatar}
                                        width={32}
                                        height={32}
                                        alt=""
                                        className="rounded-[50%]"
                                        unoptimized
                                    />
                                    <p className="flex flex-col">
                                        <span className="text-preset-4 font-bold">
                                            {transaction.name}
                                        </span>
                                        <span className="md:hidden text-preset-5">
                                            {transaction.category}
                                        </span>
                                    </p>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-preset-5">
                                    {transaction.category}
                                </TableCell>
                                <TableCell className="font-medium">
                                    <p className=" flex flex-col min-w-full">
                                        <time
                                            className="text-preset-5"
                                            dateTime={dayjs(
                                                transaction.date
                                            ).format("D MMM YYYY")}
                                        >
                                            {dayjs(transaction.date).format(
                                                "D MMM YYYY"
                                            )}
                                        </time>
                                        <span
                                            className="md:hidden text-preset-4 font-bold"
                                            style={{
                                                color:
                                                    transaction.amount > 0
                                                        ? "hsl(var(--green))"
                                                        : "hsl(var(--grey-900))",
                                            }}
                                        >
                                            {formatPosNegativeCurrency(
                                                transaction.amount
                                            )}
                                        </span>
                                    </p>
                                </TableCell>
                                <TableCell
                                    className="hidden md:table-cell text-right text-preset-4 font-bold"
                                    style={{
                                        color:
                                            transaction.amount > 0
                                                ? "hsl(var(--green))"
                                                : "hsl(var(--grey-900))",
                                    }}
                                >
                                    {formatPosNegativeCurrency(
                                        transaction.amount
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">
                                {formatPosNegativeCurrency(totals)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </main>
    );
}
