"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionCell } from "./ActionCell";
import { Transaction } from "@/lib/definitions";
import Image from "next/image";
import dayjs from "dayjs";

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
                <div className="flex flex-col justify-start gap-2 items-start sm:flex-row md:items-center font-medium">
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
            const date = new Date(row.getValue("date"));

            return (
                <time
                    className="text-preset-5 text-[hsl(var(--grey-500))] text-left"
                    dateTime={dayjs(date).format("D MMM YYYY")}
                >
                    {dayjs(date).format("D MMM YYYY")}
                </time>
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
                    className="text-center lg:text-right font-medium"
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
    {
        id: "actions",
        cell: ({ row }) => {
            const transaction = row.original;
            return <ActionCell transaction={transaction} />;
        },
    },
];
