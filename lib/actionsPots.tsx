"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
    Pot,
    PotFormState,
    WithdrawMoneyFromPotFormSchema,
    AddMoneyToPotFormSchema,
    CreatePotFormSchema,
    UpdatePotFormSchema,
} from "./definitions";

// POT ACTIONS
const WithdrawMoney = WithdrawMoneyFromPotFormSchema.omit({
    id: true,
    name: true,
    target: true,
    theme: true,
});
export async function withdrawMoneyFromPot(
    id: string,
    pot: Pot,
    formData: FormData
) {
    const { total } = WithdrawMoney.parse({
        total: formData.get("total"),
    });
    try {
        // increase the total in the pots table
        await sql`
        UPDATE pots
        SET total = ${pot.total - total}
        WHERE id = ${id}`;

        // Update the balances table by reducing the current balance
        await sql`
         UPDATE balances
         SET current = current + ${total}
     `;
    } catch (error) {
        return {
            message: "Database Error: Failed to withdraw money from pot.",
        };
    }
    revalidatePath("/dashboard/pots");
    revalidatePath("/dashboard");
    redirect("/dashboard/pots");
}

const AddMoney = AddMoneyToPotFormSchema.omit({
    id: true,
    name: true,
    target: true,
    theme: true,
});
export async function addMoneyToPot(id: string, pot: Pot, formData: FormData) {
    const { total } = AddMoney.parse({
        total: formData.get("total"),
    });
    try {
        // increase the total in the pots table
        await sql`
        UPDATE pots
        SET total = ${total + pot.total}
        WHERE id = ${id}`;

        // Update the balances table by reducing the current balance
        await sql`
         UPDATE balances
         SET current = current - ${total}
     `;
    } catch (error) {
        return {
            message: "Database Error: Failed to add money to pot.",
        };
    }
    revalidatePath("/dashboard/pots");
    revalidatePath("/dashboard");
    redirect("/dashboard/pots");
}

const CreatePot = CreatePotFormSchema.omit({ id: true });
export async function createPot(
    state: PotFormState,
    formData: FormData
): Promise<PotFormState> {
    const validatedFields = CreatePot.safeParse({
        target: formData.get("target"),
        theme: formData.get("theme"),
        name: formData.get("name"),
        total: formData.get("total"),
    });

    console.log(validatedFields);
    if (!validatedFields.success) {
        return {
            ...state,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create new pot.",
        };
    }
    // const errorMessage = { message: "Validation has failed, check your input fields." };
    const { target, theme, name, total } = validatedFields.data;

    const existingPotName =
        await sql`SELECT * FROM pots WHERE LOWER(name) = LOWER(${name.trim()})`;

    console.log(existingPotName);
    if (
        existingPotName &&
        existingPotName.rowCount &&
        existingPotName.rowCount > 0
    ) {
        return {
            ...state,
            errors: {
                name: ["Pot name already exists."],
            },
            message: "Pot name already exists.",
        };
    }

    try {
        await sql`
        INSERT INTO pots (target, theme, name, total)
        VALUES (${target}, ${theme}, ${name} , ${total})`;

        // Update the balances table by reducing the current balance
        await sql`
         UPDATE balances
         SET current = current - ${total}
     `;

        revalidatePath("/dashboard/pots");
        revalidatePath("/dashboard");
        return { message: "success" };
    } catch (error) {
        return {
            message: "Database Error: Failed to create pot",
        };
    }
}

const UpdatePot = UpdatePotFormSchema.omit({
    id: true,
    name: true,
    total: true,
    theme: true,
});
export async function updatePot(id: string, formData: FormData) {
    const { target } = UpdatePot.parse({
        target: formData.get("target"),
        theme: formData.get("theme"),
    });

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
    revalidatePath("/dashboard/pots");
    revalidatePath("/dashboard");
    redirect("/dashboard/pots");
}

export async function deletePot(id: string, pot: Pot) {
    try {
        await sql`
        UPDATE balances
        SET current = current + ${pot.total}`;

        await sql`DELETE FROM pots WHERE id = ${id}`;
    } catch (error) {
        return {
            message: "Database Error: Failed to delete budget.",
        };
    }
    revalidatePath("/dashboard/pots");
    revalidatePath("/dashboard");
}

