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
import { updatePot } from "@/lib/actionsPots";
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

const PotFormSchema = z.object({
    id: z.string(),
    name: z.string().max(30, "Name is required"),
    target: z.coerce.number(),
    total: z.coerce.number(),
    theme: z.string(),
});

export default function EditBudgetForm({
    id,
    pots,
}: Readonly<{ id: string; pots: Pot[] }>) {
    const updatePotWithID = async (formData: FormData): Promise<void> => {
        await updatePot(id, formData); // Pass pot.id and formData
    };
    const prePot = pots.find((pot) => pot.id === id);

    const form = useForm<z.infer<typeof PotFormSchema>>({
        resolver: zodResolver(PotFormSchema),
        defaultValues: {
            target: prePot?.target ?? 100,
            theme: prePot?.theme ?? "",
        },
    });

    const usedThemes = pots.map((pot) => pot.theme);

    return (
        <Form {...form}>
            <form
                id="edit-budget-form"
                action={updatePotWithID}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pot name</FormLabel>
                            <Select
                                {...field}
                                onValueChange={field.onChange}
                                value={prePot?.name}
                                disabled
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {pots.map((pot) => (
                                        <SelectItem
                                            key={pot.id}
                                            value={pot.name}
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
                    name="target"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Target</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="100"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Target amount.</FormDescription>
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
                                onValueChange={field.onChange}
                                {...field}
                                value={field.value || prePot?.theme} // Use prePot theme if field.value is null or undefined
                                defaultValue={prePot?.theme} // Set default value based on prePot
                                disabled
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
