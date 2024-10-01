"use client";
import React from "react";

import { deleteBudget } from "../../lib/actions";
import { AlertDialogAction } from "@/components/ui/alert-dialog";

export function DeleteBudget({ id }: { id: string }) {
    const deleteBudgetWithId = deleteBudget.bind(null, id);

    return (
        <form
            id="delete-budget-form"
            action={deleteBudgetWithId}           
            className="space-y-8"
        >
           <AlertDialogAction type="submit" className="w-full bg-[hsl(var(--red))]">
                Yes, Confirm Deletion 
            </AlertDialogAction>
        </form>
    );
}
