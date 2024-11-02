"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction } from "@/lib/definitions";
import Image from "next/image";

export const columns: ColumnDef<Transaction>[] = [
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
            const date = new Date(row.getValue("date"));

            // Get day, month, and year
            const day = String(date.getDate()).padStart(2, "0"); // Pad single digits with leading zero
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
            const year = date.getFullYear();
            const formatted = `${day}/${month}/${year}`;

            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "recurring",
        header: "Recurring",
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-end">
                    <Button
                        variant="ghost"
                        className="self-end"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
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

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const transaction = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(transaction.id)
                            }
                        >
                            Copy Transaction ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View Transaction details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
