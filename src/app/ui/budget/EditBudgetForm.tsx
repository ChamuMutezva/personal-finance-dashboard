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
import { updateBudget } from "../../lib/actions";

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

export default function EditBudgetForm({
    id,
    budgets,
}: Readonly<{ id: string; budgets: Budget[] }>) {
    const updateBudgetWithID = updateBudget.bind(null, id);
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

    console.log(preBudget);
   
    /* TODO: The `action={createBudget}` is used to add a new budget to the database - see form below
    THE commands that adds the budget has been commented out in the action.ts file , until the database
     has been aligned correctly such that when a new budget item has been added the categories will not
      cause a NAN ERROR in the Donut chart. The NAN is coming from calculating the USAGE total.

    */

    return (
        <Form {...form}>
            <form
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
                                    {/*}
                                    <SelectItem value="Entertainment">
                                        Entertainment
                                    </SelectItem>
                                    <SelectItem value="Dining Out">
                                        Dining Out
                                    </SelectItem>
                                    <SelectItem value="Bills">Bills</SelectItem>
                                    <SelectItem value="Personal Care">
                                        Personal Care
                                    </SelectItem>
                                    */}
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
                                disabled
                                // value={field.value}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    {budgets.map((budget) => (
                                        <SelectItem
                                            key={budget.id}
                                            value={budget.theme}
                                        >
                                            {budget.theme}
                                        </SelectItem>
                                    ))}
                                    {/*
                                    <SelectItem value="#277C78">
                                        Green
                                    </SelectItem>
                                    <SelectItem value="#F2CDAC">
                                        Cream
                                    </SelectItem>
                                    <SelectItem value="#82C9D7">
                                        Cyan
                                    </SelectItem>
                                    <SelectItem value="#626070">
                                        Grey
                                    </SelectItem>
                                    */}
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
