"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { addMoneyToPot } from "@/lib/action";

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
import { Pot } from "@/lib/definitions";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

const formSchema = z.object({
    target: z.number().positive(),
    total: z.number().positive(),
    name: z.string().min(1, "Pot name is required").max(30),
    theme: z.string().min(1, "Theme is required"),
});

function AddMoneyToPotForm({ pot }: Readonly<{ pot: Pot }>) {
    // const updatePotWithID = addMoneyToPot.bind(null, pot.id, pot);

    const updatePotWithID = async (formData: FormData): Promise<void> => {
        await addMoneyToPot(pot.id, pot, formData); // Pass pot.id and formData
        return; // Ensure this returns void
    };
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

    const [addAmount, setAddAmount] = useState(0);

    const meterPercentage = ((addAmount + pot.total) / pot.target) * 100;

    return (
        <Form {...form}>
            <form id="add-pot-form" action={updatePotWithID}>
                <p className="flex justify-between items-center text-preset-4 text-[hsl(var(--grey-500))]">
                    New amount{" "}
                    <span className="text-[hsl(var(--grey-900))] text-preset-1 font-bold">
                        ${addAmount}
                    </span>
                </p>
                <div className="meter-container w-full h-2 bg-slate-200 rounded relative">
                    <div
                        role="meter"
                        aria-valuenow={pot.total}
                        aria-valuemin={0}
                        aria-valuemax={pot.target}
                        style={{
                            backgroundColor: pot.theme,
                            transition: "width 0.3s ease-in-out",
                            width: `${(pot.total / pot.target) * 100}%`,
                        }}
                        className={`h-2 rounded-s-md border-r-2 absolute left-0`}
                    />
                    <div
                        role="meter"
                        aria-valuenow={addAmount}
                        aria-valuemin={pot.total}
                        aria-valuemax={pot.target - pot.total}
                        style={{
                            position: "absolute",
                            backgroundColor: "yellowgreen",
                            transition: "width 0.3s ease-in-out",
                            width: `${(addAmount / pot.target) * 100}%`,
                            left: `${(pot.total / pot.target) * 100}%`,
                        }}
                        className={`h-2 rounded-e-md border-l-2 absolute`}
                    />
                </div>
                <p className="flex justify-between items-center text-preset-4 text-[hsl(var(--grey-500))]">
                    {meterPercentage.toFixed(2)}%{" "}
                    <span>Target of ${pot.target}</span>
                </p>

                <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="100"
                                    required
                                    max={pot.target}
                                    maxLength={2}
                                    {...field}
                                    onChange={(evt) => {
                                        const value = Number(evt.target.value);
                                        if (value + pot.total > pot.target) {
                                            setAddAmount(
                                                pot.target - pot.total
                                            );
                                            field.onChange(
                                                pot.target - pot.total
                                            );
                                        } else {
                                            setAddAmount(value);
                                            field.onChange(value);
                                        }
                                    }}
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
