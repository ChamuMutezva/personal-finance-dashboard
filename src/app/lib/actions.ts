"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
