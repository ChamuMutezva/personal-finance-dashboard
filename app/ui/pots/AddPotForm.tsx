"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { createPot } from "@/lib/actionsPots";
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
import { Pot, CreatePotFormSchema } from "@/lib/definitions";
import {
    Dialog,    
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useFormState, useFormStatus } from "react-dom";

const formSchema = z.object({
    target: z.coerce.number().positive("Target must be a positive number"),
    total: z.coerce.number().positive("Total must be a positive number"),
    name: z
        .string()
        .min(1, "Pot name is required")
        .max(30, "Pot name must be 30 characters or less"),
    theme: z.string().min(1, "Theme is required"),
});

const INITIAL_STATE = {
    message: "",
    errors: {},
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full bg-[hsl(var(--grey-900))] border border-solid text-[hsl(var(--white))]" disabled={pending}>
            {pending ? "Adding..." : "Add Pot"}
        </Button>
    );
}

function AddPotForm({ pots }: Readonly<{ pots: Pot[] }>) {
    const [state, formAction] = useFormState(createPot, INITIAL_STATE);
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreatePotFormSchema>>({
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
                                 dark:hover:bg-[hsl(var(--grey-300))] dark:hover:text-[hsl(var(--grey-900))]                                
                                `}
                >
                    + Add New Pot <span className="sr-only">item</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 sm:max-w-[35rem] rounded-xl">
                <DialogHeader>
                    <DialogTitle>Add New Pot</DialogTitle>
                    <DialogDescription>
                        Create a pot to set savings targets. These can help you
                        on track as you save for special purchases
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form id="add-pot-form" ref={formRef} action={formAction}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Pot name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Pot name"
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
                                            id="name-error"
                                            className="text-sm text-red-500 absolute bottom-0"
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
                                <FormItem className="relative">
                                    <FormLabel>Target</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="100"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-right">
                                        Target pot amount.
                                    </FormDescription>
                                    <FormMessage />
                                    {state?.errors?.target && (
                                        <p
                                            id="target-error"
                                            className="text-sm text-red-500 absolute bottom-0"
                                        >
                                            {state.errors.target}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="total"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Total</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="10"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-right">
                                        Total pot amount.
                                    </FormDescription>
                                    <FormMessage />
                                    {state?.errors?.total && (
                                        <p
                                            id="total-error"
                                            className="text-sm text-red-500 absolute bottom-0"
                                        >
                                            {state.errors.total}
                                        </p>
                                    )}
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
                        <DialogFooter className="sm:justify-start mt-8">
                            {/*<DialogClose asChild>*/}
                            <SubmitButton />
                            {/*</DialogClose>*/}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddPotForm;
