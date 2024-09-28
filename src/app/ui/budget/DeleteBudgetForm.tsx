"use client";
import React from "react";

import { deleteBudget } from "../../lib/actions";

export function DeleteBudget({ id }: { id: string }) {
    const deleteBudgetWithId = deleteBudget.bind(null, id);

    return (
        <form
            action={deleteBudgetWithId}           
            className="space-y-8"
        >
            <button type="submit" className="w-full">
                Delete 
            </button>
        </form>
    );
}
