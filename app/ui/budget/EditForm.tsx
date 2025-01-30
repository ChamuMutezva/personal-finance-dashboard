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
import { updateBudget } from "@/lib/actionsBudgets";

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

const formSchema = z.object({
    maximum: z.number().positive(),
    category: z.string().min(1, "Category is required"),
    theme: z.string().min(1, "Category is required"),
});

export default function EditForm({
    id,
    budgets,
}: Readonly<{ id: string; budgets: Budget[] }>) {
    const updateBudgetWithID = async (formData: FormData): Promise<void> => {
        await updateBudget(id, formData); // Call your update function
    };
    const preBudget = budgets.find((budget) => budget.id === id);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maximum: preBudget?.maximum ?? 10,
            category: preBudget?.category ?? "",
            theme: preBudget?.theme ?? "",
        },
    });

    return (
        <main className="flex-1 min-h-screen flex justify-center items-center px-4 pt-6 pb-16 md:px-10 lg:p-8">
            <Form {...form}>
                <form
                    action={updateBudgetWithID}
                    className="min-w-72 space-y-8"
                >
                    <h1 className="text-preset-1">Edit budget</h1>
                    <p>
                        As your budget change, feel free to update your spending
                        limits
                    </p>
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
        </main>
    );
}
