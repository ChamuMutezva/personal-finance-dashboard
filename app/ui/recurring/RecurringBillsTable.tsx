import React from "react";
import { fetchRecurringBills } from "@/lib/data";
import Image from "next/image";
import dayjs from "dayjs";
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
import { formatPosNegativeCurrency } from "@/lib/utils";

export default async function RecurringBillsTable() {
    const bills = await fetchRecurringBills();
    return (
        <Table>
            <TableCaption>Recurring Bills Table</TableCaption>
            <TableHeader>
                <TableRow className="hidden sm:contents">
                    <TableHead className="text-preset-5 text-[hsl(var(--grey-500))]">
                        Bill Title
                    </TableHead>
                    <TableHead className="text-preset-5 text-[hsl(var(--grey-500))]">
                        Due Date
                    </TableHead>
                    <TableHead className="text-preset-5 text-[hsl(var(--grey-500))] text-right">
                        Amount
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bills.map((bill) => (
                    <TableRow key={bill.id}>
                        <TableCell className="">
                            <div className="flex justify-start gap-2 items-center">
                                <Image
                                    src={bill.avatar}
                                    width={32}
                                    height={32}
                                    alt=""
                                    className="rounded-[50%]"
                                    unoptimized
                                />
                                <p className="text-preset-4 text-[hsl(var(--grey-900))] font-bold">
                                    {bill.name}
                                </p>
                            </div>
                            <time
                                className="sm:hidden"
                                dateTime={dayjs(bill.date).format("D MMM YYYY")}
                            >
                                {dayjs(bill.date).format("D MMM YYYY")}
                            </time>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-preset-4">
                            <time
                                dateTime={dayjs(bill.date).format("D MMM YYYY")}
                            >
                                {dayjs(bill.date).format("D MMM YYYY")}
                            </time>
                        </TableCell>
                        <TableCell className="text-right text-preset-4 font-bold">
                            {formatPosNegativeCurrency(-bill.amount)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
