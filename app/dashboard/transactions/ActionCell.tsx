"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Transaction } from "@/lib/definitions";
import { formatPosNegativeCurrency } from "@/lib/utils";
import Image from "next/image";

export function ActionCell({
    transaction,
}: Readonly<{ transaction: Transaction }>) {
    const [isTransactionDialogOpen, setIsTransactionDialogOpen] =
        useState(false);
    const [isCustomerDetailsDialogOpen, setIsCustomerDetailsDialogOpen] =
        useState(false);

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
                            navigator.clipboard.writeText(transaction.id)
                        }
                    >
                        Copy Transaction ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setIsCustomerDetailsDialogOpen(true)}
                    >
                        View customer
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
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
                            Here are the details of the selected transaction.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <p>
                            <strong>Transaction ID:</strong> {transaction.id}
                        </p>
                        <p>
                            <strong>Name:</strong> {transaction.name}
                        </p>
                        <p>
                            <strong>Category:</strong> {transaction.category}
                        </p>
                        <p>
                            <strong>Amount:</strong>{" "}
                            {formatPosNegativeCurrency(transaction.amount)}
                        </p>
                        <p>
                            <strong>Recurring:</strong>{" "}
                            {transaction.recurring ? "Monthly" : "Once off"}
                        </p>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleTransactionSave}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Customer details */}
            <Dialog
                open={isCustomerDetailsDialogOpen}
                onOpenChange={setIsCustomerDetailsDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Customer Details</DialogTitle>
                        <DialogDescription>
                            Here are the details of the selected Customer.
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
}
