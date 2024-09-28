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

/* TODO: SQL commands in the createBudget function has been commented out for now 
Function working as expected but the database has to be aligned - the other TABLES
in the database should align with the budget table
    
    */

export async function createBudget(formData: FormData) {
    const { maximum, category, theme } = CreateBudget.parse({
        maximum: formData.get("maximum"),
        category: formData.get("category"),
        theme: formData.get("theme"),
    });
    console.log(maximum, category, theme);
    /*
    await sql`
    INSERT INTO budgets (maximum, category, theme)
    VALUES (${maximum}, ${category}, ${theme})`;

    revalidatePath("/budgets")
    redirect("/budgets")
    */
}

const UpdateBudget = FormSchema.omit({ id: true, category: true, theme: true });

export async function updateBudget(id: string, formData: FormData) {
    const { maximum } = UpdateBudget.parse({
        maximum: formData.get("maximum"),
        // category: formData.get("category"),
        // theme: formData.get("theme"),
    });

    console.log(maximum);

    await sql`
    UPDATE budgets
    SET maximum = ${maximum} 
    WHERE id = ${id}`;

    revalidatePath("/budgets");
    redirect("/budgets");
}

export async function deleteBudget(id: string) {
    console.log("hey there, i am in")
    await sql`DELETE FROM budgets WHERE id = ${id}`;
    revalidatePath("/budgets");
}
