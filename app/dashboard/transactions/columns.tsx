"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionCell } from "../../ui/transactions/ActionCell";
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
                    className="md:text-preset-4 font-bold"
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
                <div className="flex flex-col justify-start gap-2 items-start sm:flex-row sm:items-center font-medium">
                    <Image
                        src={transaction.avatar}
                        width={32}
                        height={32}
                        alt=""
                        className="rounded-[50%] hidden sm:block"
                        unoptimized
                    />
                    <span className="text-preset-5 md:text-preset-4">{transaction.name}</span>
                </div>
            );
        },
        enableHiding: false,
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="md:text-preset-4 font-bold"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const category = row.getValue("category") as string;
            return (
                <div className="text-preset-5 md:text-preset-4 text-[hsl(var(--grey-500))] text-left">
                    {category}
                </div>
            );
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="md:text-preset-4 font-bold"
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
                    className="text-preset-5 md:text-preset-4 text-[hsl(var(--grey-500))] text-left"
                    dateTime={dayjs(date).format("D MMM YYYY")}
                >
                    <span className="sm:hidden">
                        {dayjs(date).format("DD/MM/YYYY")}
                    </span>
                    <span className="hidden sm:inline">
                        {dayjs(date).format("D MMM YYYY")}
                    </span>
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
                        className="text-center md:text-preset-4 font-bold"
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
                    className="text-center text-preset-5 md:text-preset-4 lg:text-right font-medium"
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
