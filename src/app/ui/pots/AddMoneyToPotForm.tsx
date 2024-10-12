"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { createPot } from "../../lib/actions";
import { colors } from "@/app/lib/data";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pot } from "@/app/lib/definitions";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import Meter from "../budget/Meter";
import ProgressMeter  from "./ProgressMeter";

const formSchema = z.object({
    target: z.number().positive(),
    total: z.number().positive(),
    name: z.string().min(1, "Pot name is required").max(30),
    theme: z.string().min(1, "Theme is required"),
});

function AddMoneyToPotForm({ pot }: Readonly<{ pot: Pot }>) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            target: 1000,
            total: 10,
            name: "",
            theme: "",
        },
    });

    console.log(pot);
    // Get used categories and themes
    // const usedCategories = budgets.map((budget) => budget.category);
    //  const usedThemes = pots.map((pot) => pot.theme);

    return (
        <Form {...form}>
            <form id="add-pot-form" action={createPot}>
               
              
                <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Target</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="100"
                                    required
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Amount to Add.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter className="sm:justify-start mt-4">
                    <DialogClose asChild>
                        <Button type="submit" className="w-full">
                            Confirm Addition
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    );
}

export default AddMoneyToPotForm;
