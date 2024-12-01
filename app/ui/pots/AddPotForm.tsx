"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createPot } from "@/lib/action";
import { colors } from "@/lib/data";

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
import { useFormState, useFormStatus } from "react-dom";

const formSchema = z.object({
    target: z.coerce.number().positive("Target must be a positive number"),
    total: z.coerce.number().positive("Total must be a positive number"),
    name: z.string().min(1, "Pot name is required").max(30, "Pot name must be 30 characters or less"),
    theme: z.string().min(1, "Theme is required"),
});

const INITIAL_STATE = {
    message: "",
    errors: {},
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Adding..." : "Add Pot"}
        </Button>
    );
}

function AddPotForm({ pots }: Readonly<{ pots: Pot[] }>) {
    const [state, formAction] = useFormState(createPot, INITIAL_STATE);

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

    // Get used categories and themes - use a theme and category only once
    // const usedCategories = budgets.map((budget) => budget.category);
    const usedThemes = pots.map((pot) => pot.theme);
    /*
    const handleCreatePot = async (formData: FormData): Promise<void> => {
        await createPot(formData); // Call your createPot function
        return; // Ensure this returns void
    };
    */
  
    return (
        <Form {...form}>
            <form id="add-pot-form" action={formAction}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pot name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Pot name"
                                    // required
                                    maxLength={30}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="text-right">{`${
                                30 - field.value.length
                            } of 30 characters left`}</FormDescription>
                            <FormMessage />
                            {state?.errors?.name && (
                                <p
                                    id="email-error"
                                    className="text-sm text-red-500"
                                >
                                    {state.errors.name}
                                </p>
                            )}
                        </FormItem>
                    )}
                />

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
                            <FormDescription>
                                Target pot amount.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="10"
                                    required
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Total pot amount.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Color tag</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value); // Update value in React Hook Form
                                }}
                                {...field}
                                // value={field.value}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    {colors.map((color) => (
                                        <SelectItem
                                            key={color.hex}
                                            value={color.hex}
                                            className={`flex gap-8 items-center justify-start min-h-8`}
                                            disabled={usedThemes.includes(
                                                color.hex
                                            )} // Disable if already in use
                                        >
                                            <span
                                                className={`inline-block relative h-3 w-3 rounded-full mr-4`}
                                                style={{
                                                    backgroundColor: color.hex,
                                                }}
                                            ></span>
                                            {color.color}
                                            {usedThemes.includes(color.hex) && (
                                                <span className="text-[hsl(var(--grey-500))] ml-2 line-through">
                                                    already used
                                                </span>
                                            )}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter className="sm:justify-start mt-4">
                    <DialogClose asChild>
                        <SubmitButton />
                        {/* <Button type="submit" className="w-full">
                            Add Pot
                        </Button>
                        */}
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    );
}

export default AddPotForm;
