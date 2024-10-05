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
import { categories, colors, fetchPots } from "@/app/lib/data";

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

const formSchema = z.object({
    maximum: z.number().positive(),
    category: z.string().min(1, "Category is required"),
    theme: z.string().min(1, "Category is required"),
});

function AddPotForm({ pots }: { pots: Pot[] }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maximum: 10,
            category: "",
            theme: "",
        },
    });

    // Get used categories and themes
    // const usedCategories = budgets.map((budget) => budget.category);
    //  const usedThemes = budgets.map((budget) => budget.theme);

    return (
        <Form {...form}>
            <form
                id="add-budget-form"
                action={createBudget}              
                className="space-y-8"
            >
                {/* Step 2: Connect Select with React Hook Form */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pot Name</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                // value={field.value}
                                {...field}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pot" />
                                </SelectTrigger>
                                <SelectContent>
                                    {pots.map((pot) => (
                                        <SelectItem
                                            key={pot.id}
                                            value={pot.name}
                                            className={`flex justify-between`}
                                        >
                                            {pot.name}
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
                            <FormLabel>Target</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="10"
                                    required
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Maximum pot amount.
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
                                        >
                                            <span
                                                className={`inline-block relative h-3 w-3 rounded-full mr-4`}
                                                style={{
                                                    backgroundColor: color.hex,
                                                }}
                                            ></span>
                                            {color.color}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
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
                            Add Pot
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    );
}

export default AddPotForm;
