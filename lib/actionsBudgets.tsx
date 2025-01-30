"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
    BudgetState,
    BudgetFormSchema,
} from "./definitions";

// *****BUDGET ACTIONS*****
const CreateBudget = BudgetFormSchema.omit({ id: true });
export async function createBudget(
    state: BudgetState,
    formData: FormData
): Promise<BudgetState> {
    const validatedFields = CreateBudget.safeParse({
        maximum: formData.get("maximum"),
        category: formData.get("category"),
        theme: formData.get("theme"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            ...state,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Invoice.",
        };
    }

    const { maximum, category, theme } = validatedFields.data;
    try {
        await sql`
        INSERT INTO budgets (maximum, category, theme)
        VALUES (${maximum}, ${category}, ${theme})`;

        revalidatePath("/dashboard/budgets");
        revalidatePath("/dashboard");
        return { message: "success" };
    } catch (error) {
        return {
            message: "Database Error: Failed to create budget",
        };
    }
}

// update budget
const UpdateBudget = BudgetFormSchema.omit({
    id: true,
    category: true,
    theme: true,
});
export async function updateBudget(id: string, formData: FormData) {
    const { maximum } = UpdateBudget.parse({
        maximum: formData.get("maximum"),
    });

    try {
        await sql`
        UPDATE budgets
        SET maximum = ${maximum} 
        WHERE id = ${id}`;
    } catch (error) {
        return {
            message: "Database Error: Failed to update budget.",
        };
    }

    revalidatePath("/dashboard/budgets");
    revalidatePath("/dashboard");
    redirect("/dashboard/budgets");
}

export async function deleteBudget(id: string) {   
    try {
        await sql`DELETE FROM budgets WHERE id = ${id}`;
    } catch (error) {
        return {
            message: "Database Error: Failed to delete budget.",
        };
    }
    revalidatePath("/dashboard/budgets");
    revalidatePath("/dashboard");
}
