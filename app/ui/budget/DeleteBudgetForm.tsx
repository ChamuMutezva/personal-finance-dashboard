"use client";
import React from "react";

import { deleteBudget } from "@/lib/actionsBudgets";
import { AlertDialogAction } from "@/components/ui/alert-dialog";

export function DeleteBudget({ id }: Readonly<{ id: string }>) {
    // const deleteBudgetWithId = deleteBudget.bind(null, id);
    const deleteBudgetWithId = async (formData: FormData): Promise<void> => {
        // Call your delete function and handle its response
        const result = await deleteBudget(id); // Call your delete function

        // Optionally handle success or error here
        if (result?.message) {
            console.log(result.message); // Log or display success message
        }
    };

    return (
        <form
            id="delete-budget-form"
            action={deleteBudgetWithId}
            className="space-y-8"
        >
            <AlertDialogAction
                type="submit"
                className="w-full bg-[hsl(var(--red))] dark:bg-[var(--primary)]] dark:text-[hsl(var(--white))] border-2"
            >
                Yes, Confirm Deletion
            </AlertDialogAction>
        </form>
    );
}
