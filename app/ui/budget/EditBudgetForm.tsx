"use client";
import React from "react";
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
import { updateBudget } from "@/lib/action";
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
import { Budget } from "@/lib/definitions";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

const formSchema = z.object({
    maximum: z.number().positive(),
    category: z.string().min(1, "Category is required"),
    theme: z.string().min(1, "Category is required"),
});

export default function EditBudgetForm({
    id,
    budgets,
}: Readonly<{ id: string; budgets: Budget[] }>) {
    // const updateBudgetWithID = updateBudget.bind(null, id);
    const updateBudgetWithID = async (formData: FormData): Promise<void> => {
        await updateBudget(id, formData); // Call your update function
        // return; // Ensure this returns void
    };

    const preBudget = budgets.find((budget) => budget.id === id);
    // const id = params.id;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maximum: preBudget?.maximum ?? 10,
            category: preBudget?.category ?? "",
            theme: preBudget?.theme ?? "",
        },
    });

    const usedThemes = budgets.map((budget) => budget.theme);

    return (
        <Form {...form}>
            <form
                id="edit-budget-form"
                action={updateBudgetWithID}
                className="space-y-8"
            >
                {/* Step 2: Connect Select with React Hook Form */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                                {...field}
                                onValueChange={field.onChange}
                                // defaultValue={preBudget?.category}
                                value={preBudget?.category}
                                disabled
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {budgets.map((budget) => (
                                        <SelectItem
                                            key={budget.id}
                                            value={budget.category}
                                        >
                                            {budget.category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="maximum"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Maximum budget amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="10"
                                    {...field}
                                    // value={preBudget?.maximum}
                                />
                            </FormControl>
                            <FormDescription>
                                Maximum budget amount.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Theme</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value); // Update value in React Hook Form
                                }}
                                {...field}
                                // disabled
                                value={field.value}
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
              
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            className="w-full bg-[hsl(var(--grey-900))] border border-solid text-[hsl(var(--white))]"
                        >
                            Save Changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    );
}
