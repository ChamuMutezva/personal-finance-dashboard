import React from "react";
import { fetchFilteredTransactions } from "@/lib/data";
import { formatPosNegativeCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
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

export default async function TransactionTable({
    query,
    currentPage,    
}: Readonly<{
    query: string;
    currentPage: number;
    
}>) {
    const sortBy: "Latest" | "Oldest" | "A to Z" | "Z to A" | "Highest" | "Lowest" = "Latest";
    const transactions = await fetchFilteredTransactions(query, currentPage, sortBy)  
    const totals = transactions.reduce((accumulator, transaction) => {
        return Number(accumulator) + Number(transaction.amount);
    }, 0);
 
    return (
        <Table>
            <TableCaption>A list of my transactions.</TableCaption>
            <TableHeader>
                <TableRow className="hidden sm:contents">
                    <TableHead className="text-preset-5 text-[hsl(var(--grey-500))]">Recipient/Sender</TableHead>
                    <TableHead className="text-preset-5 text-[hsl(var(--grey-500))]">Category</TableHead>
                    <TableHead className="text-preset-5 text-[hsl(var(--grey-500))]">Transaction Date</TableHead>
                    <TableHead className="text-preset-5 text-[hsl(var(--grey-500))] text-right">Amount</TableHead>
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
                                <span className="text-preset-4 text-[hsl(var(--grey-900))] font-bold">
                                    {transaction.name}
                                </span>
                                <span className="sm:hidden text-preset-5 text-[hsl(var(--grey-500))]">
                                    {transaction.category}
                                </span>
                            </p>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-preset-5 text-[hsl(var(--grey-500))]">
                            {transaction.category}
                        </TableCell>
                        <TableCell className="font-medium flex-1">
                            <p className=" flex flex-col-reverse min-w-full">
                                <time
                                    className="text-preset-5 text-[hsl(var(--grey-500))]"
                                    dateTime={dayjs(transaction.date).format(
                                        "D MMM YYYY"
                                    )}
                                >
                                    {dayjs(transaction.date).format(
                                        "D MMM YYYY"
                                    )}
                                </time>
                                <span
                                    className="sm:hidden text-preset-4 font-bold"
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
                            className="hidden sm:table-cell text-right text-preset-4 font-bold"
                            style={{
                                color:
                                    transaction.amount > 0
                                        ? "hsl(var(--green))"
                                        : "hsl(var(--grey-900))",
                            }}
                        >
                            {formatPosNegativeCurrency(transaction.amount)}
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
    );
}
