"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Transaction } from "@/lib/definitions";
import Image from "next/image";
import dayjs from "dayjs";

function getOrdinal(n: number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const modulo100 = n % 100;
    const modulo10 = n % 10;

    if (modulo10 === 1 && modulo100 !== 11) {
        return n + suffixes[1]; // "st"
    } else if (modulo10 === 2 && modulo100 !== 12) {
        return n + suffixes[2]; // "nd"
    } else if (modulo10 === 3 && modulo100 !== 13) {
        return n + suffixes[3]; // "rd"
    } else {
        return n + suffixes[0]; // "th"
    }
}

export const columns: ColumnDef<Transaction>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const transaction = row.original;

            return (
                <div className="flex flex-col justify-start gap-2 items-start md:flex-row md:items-center font-medium">
                    <Image
                        src={transaction.avatar}
                        width={32}
                        height={32}
                        alt=""
                        className="rounded-[50%]"
                        unoptimized
                    />
                    <span>{transaction.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = dayjs(new Date(row.getValue("date")));
            const dayOfMonth = date.date();

            return (
                <div className="flex items-center gap-4 justify-start">
                    <p>Monthly - {getOrdinal(dayOfMonth)}</p>
                    {dayOfMonth >= 29 ? (
                        ""
                    ) : dayOfMonth >= 12 ? (
                        <Image
                            src={"/assets/images/icon-bill-due.svg"}
                            width={14}
                            height={14}
                            alt=""
                            className="rounded-[50%]"
                            unoptimized
                        />
                    ) : (
                        <Image
                            src={"/assets/images/icon-bill-paid.svg"}
                            width={14}
                            height={14}
                            alt=""
                            className="rounded-[50%]"
                            unoptimized
                        />
                    )}
                </div>
            );
        },
    },

    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-end">
                    <Button
                        variant="ghost"
                        className="text-center"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                        Amount
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);

            return (
                <div
                    className="text-right font-medium"
                    style={{
                        color:
                            amount > 0
                                ? "hsl(var(--green))"
                                : "hsl(var(--grey-900))",
                    }}
                >
                    {formatted}
                </div>
            );
        },
    },
];