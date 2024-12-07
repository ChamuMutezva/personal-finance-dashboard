"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
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
import { createBudget } from "@/lib/action";
import { categories, colors } from "@/lib/data";
import { BudgetFormSchema, BudgetState, Budget } from "@/lib/definitions";

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
import {
    Dialog,    
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
    maximum: z.number().positive(),
    category: z.string().min(1, "Category is required"),
    theme: z.string().min(1, "Theme is required"),
});

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Adding..." : "Add Budget"}
        </Button>
    );
}

function AddBudgetForm({ budgets }: Readonly<{ budgets: Budget[] }>) {
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    // 1. Define your form.
    const form = useForm<z.infer<typeof BudgetFormSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maximum: 10,
            category: "",
            theme: "",
        },
    });

    const initialState: BudgetState = { message: null, errors: {} };
    const [state, formAction] = useFormState(createBudget, initialState);

    // Get used categories and themes
    const usedCategories = budgets.map((budget) => budget.category);
    const usedThemes = budgets.map((budget) => budget.theme);

    useEffect(() => {
        if (state?.message === "success") {
            setIsOpen(false);
            form.reset();
            if (formRef.current) {
                formRef.current.reset();
            }
        }
    }, [state, form]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className={`focus:outline-dashed focus:outline-current focus:outline-1 focus:-outline-offset-4                                
                                hover:outline-dashed hover:outline-current hover:outline-1 hover:-outline-offset-4
                                bg-[hsl(var(--grey-900))] text-[hsl(var(--white))]
                                dark:bg-[hsl(var(--grey-100))] dark:text-[hsl(var(--grey-900))]
                                 hover:bg-[hsl(var(--grey-700))] hover:text-[hsl(var(--grey-900))]
                                 dark:hover:bg-[hsl(var(--grey-300))] dark:hover:text-[hsl(var(--grey-900))] `}
                >
                    + Add New Budget <span className="sr-only">item</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 sm:max-w-[35rem] rounded-xl">
                <DialogHeader>
                    <DialogTitle>Add New Budget</DialogTitle>
                    <DialogDescription>
                        Choose a category to set a spending budget. These
                        categories can help you monitor spending.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        id="add-budget-form"
                        ref={formRef}
                        action={formAction}
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
                                        {...field}
                                        onValueChange={field.onChange}
                                        value={field.value || undefined}
                                        aria-describedby="category-error"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a category" />
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
                                        {state?.errors?.category?.map(
                                            (error: string) => (
                                                <p
                                                    className="mt-2 text-sm text-red-500"
                                                    key={error}
                                                >
                                                    {state?.errors?.category}
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
                                        {state?.errors?.maximum?.map(
                                            (error: string) => (
                                                <p
                                                    className="mt-2 text-sm text-red-500"
                                                    key={error}
                                                >
                                                    {state.errors?.maximum}
                                                </p>
                                            )
                                        )}
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
                                        {...field}
                                        onValueChange={field.onChange}
                                        value={field.value || undefined}
                                        aria-describedby="theme-error"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a theme" />
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
                                                            backgroundColor:
                                                                color.hex,
                                                        }}
                                                    ></span>
                                                    {color.color}
                                                    {usedThemes.includes(
                                                        color.hex
                                                    ) && (
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
                                        {state?.errors?.theme?.map(
                                            (error: string) => (
                                                <p
                                                    className="mt-2 text-sm text-red-500"
                                                    key={error}
                                                >
                                                    {state.errors?.theme}
                                                </p>
                                            )
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="sm:justify-start">
                            <SubmitButton />                           
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddBudgetForm;
