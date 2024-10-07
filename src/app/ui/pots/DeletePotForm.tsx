"use client";
import React from "react";

import { deletePot } from "../../lib/actions";
import { AlertDialogAction } from "@/components/ui/alert-dialog";

export function DeletePot({ id }: { id: string }) {
    const deletePotWithId = deletePot.bind(null, id);

    return (
        <form
            id="delete-pot-form"
            action={deletePotWithId}
            className="space-y-8"
        >
            <AlertDialogAction
                type="submit"
                className="w-full bg-[hsl(var(--red))]"
            >
                Yes, Confirm Deletion
            </AlertDialogAction>
        </form>
    );
}
