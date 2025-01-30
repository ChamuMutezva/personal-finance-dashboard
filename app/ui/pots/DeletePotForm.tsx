"use client";
import React from "react";
import { Pot } from "@/lib/definitions";
import { deletePot } from "@/lib/actionsPots";
import { AlertDialogAction } from "@/components/ui/alert-dialog";

export function DeletePot({ pot }: Readonly<{ pot: Pot }>) {
    const deletePotWithId = async (formData: FormData): Promise<void> => {
        // Call your delete function and handle its response
        const result = await deletePot(pot.id, pot); // Call your delete function

        // Optionally handle success or error here
        if (result?.message) {
            console.log(result.message); // Log or display success message
        }
    };

    return (
        <form
            id="delete-pot-form"
            action={deletePotWithId}
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
