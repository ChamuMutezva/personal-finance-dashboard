"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CreatePotFormSchema = z.object({
    id: z.string(),
    name: z.string().max(30, "Name is required"),
    target: z.coerce.number(),
    total: z.coerce.number(),
    theme: z.string(),
});

// CREATE A POT
const CreatePot = CreatePotFormSchema.omit({ id: true });
export async function createPot(id: string, formData: FormData) {
    console.log(formData);
    const { target, theme, name, total } = CreatePot.parse({
        target: formData.get("target"),
        theme: formData.get("theme"),
        name: formData.get("name"),
        total: formData.get("total"),
    });
    console.log(`theme - ${theme}, target - ${target}`);
    try {
        await sql`
        UPDATE pots
        SET target = ${target}, theme = ${theme}, name = ${name}, total = ${total}
        WHERE id = ${id}`;
    } catch (error) {
        return {
            message: "Database Error: Failed to update pot.",
        };
    }
    revalidatePath("/pots");
    redirect("/pots");
}

// UPDATE A POT
const UpdatePotFormSchema = z.object({
    id: z.string(),
    name: z.string().max(30, "Name is required"),
    target: z.coerce.number(),
    total: z.coerce.number(),
    theme: z.string(),
});

const UpdatePot = UpdatePotFormSchema.omit({
    id: true,
    name: true,
    total: true,
    theme: true,
});
export async function updatePot(id: string, formData: FormData) {
    console.log(formData);
    const { target } = UpdatePot.parse({
        target: formData.get("target"),
        theme: formData.get("theme"),
    });
    console.log(` target - ${target}`);
    try {
        await sql`
        UPDATE pots
        SET target = ${target}
        WHERE id = ${id}`;
    } catch (error) {
        return {
            message: "Database Error: Failed to update pot.",
        };
    }
    revalidatePath("/pots");
    redirect("/pots");
}

const FormSchema = z.object({
    id: z.string(),
    maximum: z.coerce.number(),
    category: z.string().min(1, "Category is required"),
    theme: z.string().min(1, "Category is required"),
});

const CreateBudget = FormSchema.omit({ id: true });
export async function createBudget(formData: FormData) {
    const { maximum, category, theme } = CreateBudget.parse({
        maximum: formData.get("maximum"),
        category: formData.get("category"),
        theme: formData.get("theme"),
    });

    try {
        await sql`
        INSERT INTO budgets (maximum, category, theme)
        VALUES (${maximum}, ${category}, ${theme})`;
    } catch (error) {
        return {
            message: "Database Error: Failed to create budget",
        };
    }
    revalidatePath("/budgets");
    redirect("/budgets");
}

// update budget
const UpdateBudget = FormSchema.omit({ id: true, category: true });
export async function updateBudget(id: string, formData: FormData) {
    const { maximum, theme } = UpdateBudget.parse({
        maximum: formData.get("maximum"),
        // category: formData.get("category"),
        theme: formData.get("theme"),
    });

    console.log(maximum);

    try {
        await sql`
        UPDATE budgets
        SET maximum = ${maximum} , theme = ${theme}
        WHERE id = ${id}`;
    } catch (error) {
        return {
            message: "Database Error: Failed to update budget.",
        };
    }

    revalidatePath("/budgets");
    redirect("/budgets");
}

export async function deleteBudget(id: string) {
    // throw new Error('Failed to Delete budget');
    try {
        console.log("hey there, i am in");
        await sql`DELETE FROM budgets WHERE id = ${id}`;
    } catch (error) {
        return {
            message: "Database Error: Failed to delete budget.",
        };
    }
    revalidatePath("/budgets");
}
