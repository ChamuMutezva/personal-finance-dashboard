"use client";
import React from "react";
import { Pot } from "@/app/lib/definitions";

import { deletePot } from "../../lib/actions";
import { AlertDialogAction } from "@/components/ui/alert-dialog";

export function DeletePot({ pot }: { pot: Pot }) {
    const deletePotWithId = deletePot.bind(null, pot.id, pot);

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
