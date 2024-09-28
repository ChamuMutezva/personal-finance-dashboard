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
import { createBudget } from "../../lib/actions";
import { categories, colors } from "@/app/lib/data";

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
import { Budget } from "@/app/lib/definitions";

const formSchema = z.object({
    maximum: z.number().positive(),
    category: z.string().min(1, "Category is required"),
    theme: z.string().min(1, "Category is required"),
});

function AddBudgetForm({ budgets }: { budgets: Budget[] }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maximum: 10,
            category: "",
            theme: "",
        },
    });

    /*
    function onSubmit(values: z.infer<typeof formSchema>) {        
        console.log(values);
    }
  */

    /* TODO: The `action={createBudget}` is used to add a new budget to the database - see form below
    THE commands that adds the budget has been commented out in the action.ts file , until the database
     has been aligned correctly such that when a new budget item has been added the categories will not
      cause a NAN ERROR in the Donut chart. The NAN is coming from calculating the USAGE total.

    The onsubmit handler is a dummy and should be removed
    */
    // Get used categories and themes
    const usedCategories = budgets.map((budget) => budget.category);
    const usedThemes = budgets.map((budget) => budget.theme);

    return (
        <Form {...form}>
            <form
                action={createBudget}
                /*  onSubmit={form.handleSubmit(onSubmit)} */
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
                                onValueChange={field.onChange}
                                // value={field.value}
                                {...field}
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
                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </Form>
    );
}

export default AddBudgetForm;
