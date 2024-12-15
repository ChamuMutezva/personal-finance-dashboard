"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction } from "@/lib/definitions";
import { formatPosNegativeCurrency } from "@/lib/utils";
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
            const [isTransactionDialogOpen, setIsTransactionDialogOpen] =
                useState(false);
            const [
                isCustomerDetailsDialogOpen,
                setIsCustomerDetailsDialogOpen,
            ] = useState(false);
            const handleTransactionSave = () => {
                setIsTransactionDialogOpen(false);
            };
            const handleCustomerDetailsSave = () => {
                setIsCustomerDetailsDialogOpen(false);
            };

            return (
                <>
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
                                    navigator.clipboard.writeText(
                                        transaction.id
                                    )
                                }
                            >
                                Copy Transaction ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    setIsCustomerDetailsDialogOpen(true)
                                }
                            >
                                View customer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setIsTransactionDialogOpen(true)}
                            >
                                View Transaction details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* View Transaction details */}
                    <Dialog
                        open={isTransactionDialogOpen}
                        onOpenChange={setIsTransactionDialogOpen}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Transaction Details</DialogTitle>
                                <DialogDescription>
                                    Here are the details of the selected
                                    transaction.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                                <p>
                                    <strong>Transaction ID:</strong>{" "}
                                    {transaction.id}
                                </p>
                                <p>
                                    <strong>Name:</strong> {transaction.name}
                                </p>
                                <p>
                                    <strong>Category:</strong>{" "}
                                    {transaction.category}
                                </p>
                                <p>
                                    <strong>Amount:</strong>{" "}
                                    {formatPosNegativeCurrency(
                                        transaction.amount
                                    )}
                                </p>
                                <p>
                                    <strong>Recurring:</strong>{" "}
                                    {transaction.recurring
                                        ? "Monthly"
                                        : "Once off"}
                                </p>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={handleTransactionSave}
                                >
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    {/* End View Transaction details */}

                    {/* View Customer details */}
                    <Dialog
                        open={isCustomerDetailsDialogOpen}
                        onOpenChange={setIsCustomerDetailsDialogOpen}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Customer Details</DialogTitle>
                                <DialogDescription>
                                    Here are the details of the selected
                                    Customer.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                                <p>
                                    <strong>Name:</strong> {transaction.name}
                                </p>

                                <Image
                                    src={transaction.avatar}
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={handleCustomerDetailsSave}
                                >
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            );
        },
    },
];
