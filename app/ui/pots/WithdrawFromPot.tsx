"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { withdrawMoneyFromPot } from "@/lib/action";

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

function WithDrawFromPot({ pot }: Readonly<{ pot: Pot }>) {
    // const updatePotWithID = withdrawMoneyFromPot.bind(null, pot.id, pot);

    const updatePotWithID = async (formData: FormData): Promise<void> => {
        await withdrawMoneyFromPot(pot.id, pot, formData); // Pass pot.id and formData
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

    const [withdrawAmount, setWithdrawAmount] = useState(0);

    const meterPercentage = ((pot.total - withdrawAmount) / pot.target) * 100;

    return (
        <Form {...form}>
            <form id="add-pot-form" action={updatePotWithID}>
                <p className="flex justify-between items-center text-preset-4 text-[hsl(var(--grey-500))]">
                    New amount{" "}
                    <span className="text-[hsl(var(--grey-900))] text-preset-1 font-bold">
                        ${pot.total - withdrawAmount}
                    </span>
                </p>
                <div className="meter-container w-full h-2 bg-slate-200 rounded relative">
                    <div
                        role="meter"
                        aria-valuenow={pot.total - withdrawAmount}
                        aria-valuemin={0}
                        aria-valuemax={pot.target}
                        aria-label={`withdrawal amount balance`}
                        style={{
                            backgroundColor: pot.theme,
                            transition: "width 0.3s ease-in-out",
                            width: `${
                                ((pot.total - withdrawAmount) / pot.target) *
                                100
                            }%`,
                        }}
                        className={`h-2 rounded-s-md border-r-2 absolute left-0`}
                    />
                    <div
                        role="meter"
                        aria-valuenow={withdrawAmount}
                        aria-valuemin={0}
                        aria-label={`${withdrawAmount}`}
                        aria-valuemax={pot.target - pot.total - withdrawAmount}
                        style={{
                            position: "absolute",
                            backgroundColor: "yellowgreen",
                            transition: "width 0.3s ease-in-out",
                            width: `${(withdrawAmount / pot.target) * 100}%`,
                            left: `${
                                ((pot.total - withdrawAmount) / pot.target) *
                                100
                            }%`,
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
                            <FormLabel>Target</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="100"
                                    required
                                    {...field}
                                    onChange={(evt) => {
                                        const value = Number(evt.target.value);
                                        if (value > pot.total) {
                                            setWithdrawAmount(pot.total);
                                            field.onChange(pot.total);
                                        } else {
                                            setWithdrawAmount(value);
                                            field.onChange(value);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Amount to withdraw
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter className="sm:justify-start mt-4">
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            className="w-full bg-[hsl(var(--grey-900))] border border-solid text-[hsl(var(--white))]"
                        >
                            Confirm Withdrawal
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    );
}

export default WithDrawFromPot;
