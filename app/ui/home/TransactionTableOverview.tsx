import React from "react";
import { fetchFilteredTransactions } from "@/lib/data";
import { formatPosNegativeCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
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

export default async function TransactionTableOverview({
    query,
    currentPage,
}: Readonly<{
    query: string;
    currentPage: number;
}>) {
    const transactions = (
        await fetchFilteredTransactions(query, currentPage)
    ).slice(0, 5);

    const totals = transactions.reduce((accumulator, transaction) => {
        return Number(accumulator) + Number(transaction.amount);
    }, 0);

    return (
        <Card className="p-4 xl:col-span-7 xl:row-start-4 xl:row-span-4 mb-4 xl:mb-0">
            <div className="flex items-center justify-between pb-4">
                <h2
                    className={`text-preset-3 text-[hsl(var(--grey-900))] font-bold`}
                >
                    Transactions
                </h2>
                <Link
                    href={`/dashboard/transactions`}
                    className={`p-2 flex items-center gap-2 text-[hsl(var(--grey-500))] text-preset-4
                                                    focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4
                                                    hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4`}
                >
                    See all <span className="sr-only">list of pots</span>
                    <Image
                        src="assets/images/icon-caret-right.svg"
                        alt=""
                        width={6}
                        height={11}
                    />
                </Link>
            </div>
            <Table>
                <TableCaption className="sr-only">
                    A list of my transactions.
                </TableCaption>
                <TableHeader>
                    <TableRow className="hidden sm:contents">
                        <TableHead className="text-preset-5 text-[hsl(var(--grey-500))]">
                            Recipient/Sender
                        </TableHead>
                        <TableHead className="text-preset-5 text-[hsl(var(--grey-500))]">
                            Category
                        </TableHead>
                        <TableHead className="text-preset-5 text-[hsl(var(--grey-500))]">
                            Transaction Date
                        </TableHead>
                        <TableHead className="text-preset-5 text-[hsl(var(--grey-500))] text-right">
                            Amount
                        </TableHead>
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
                                        dateTime={dayjs(
                                            transaction.date
                                        ).format("D MMM YYYY")}
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
        </Card>
    );
}
