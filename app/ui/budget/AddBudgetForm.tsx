"use client";
import React from "react";
import { useFormState } from "react-dom";
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
import { createBudget, State } from "@/lib/action";
import { categories, colors } from "@/lib/data";

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

function AddBudgetForm({ budgets }: Readonly<{ budgets: Budget[] }>) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maximum: 10,
            category: "",
            theme: "",
        },
    });

    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useFormState(createBudget, initialState);

    // Get used categories and themes
    const usedCategories = budgets.map((budget) => budget.category);
    const usedThemes = budgets.map((budget) => budget.theme);

    return (
        <Form {...form}>
            <form
                id="add-budget-form"
                action={formAction}
                /*  onSubmit={form.handleSubmit(onSubmit)} */
                className="space-y-8"
            >
                {/* Step 2: Connect Select with React Hook Form */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Budget Category</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                // value={field.value}
                                {...field}
                                aria-describedby="category-error"
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.category}
                                            value={category.category}
                                            disabled={usedCategories.includes(
                                                category.category
                                            )} // disable if already in use
                                            className={`flex justify-between`}
                                        >
                                            {category.category}
                                            {usedCategories.includes(
                                                category.category
                                            ) && (
                                                <span className="text-[hsl(var(--grey-500))] ml-2 line-through">
                                                    Already used
                                                </span>
                                            )}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            <div
                                id="category-error"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {state.errors?.category?.map(
                                    (error: string) => (
                                        <p
                                            className="mt-2 text-sm text-red-500"
                                            key={error}
                                        >
                                            {error}
                                        </p>
                                    )
                                )}
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="maximum"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Maximum spending</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="10"
                                    required
                                    aria-describedby="maximum-error"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Maximum budget amount.
                            </FormDescription>
                            <FormMessage />
                            <div
                                id="maximum-error"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {state.errors?.maximum?.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))}
                            </div>
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
                                aria-describedby="theme-error"
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
                            <div
                                id="theme-error"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {state.errors?.theme &&
                                    state.errors.theme.map((error: string) => (
                                        <p
                                            className="mt-2 text-sm text-red-500"
                                            key={error}
                                        >
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </FormItem>
                    )}
                />
                {/*
                <Button type="submit" className="w-full">
                    Submit
                </Button>
                */}
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="submit" className="w-full">
                            Add Budget
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    );
}

export default AddBudgetForm;
