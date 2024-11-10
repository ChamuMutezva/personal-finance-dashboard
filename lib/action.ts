"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
    Pot,
    FormState,
    User,
    signupSchema,
    authenticateSchema,
    WithdrawMoneyFromPotFormSchema,
    AddMoneyToPotFormSchema,
    CreatePotFormSchema,
    UpdatePotFormSchema,
} from "./definitions";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "./session";

// SIGN UP SECTION
const CreateUser = signupSchema.omit({ id: true });
export async function createUser(
    state: FormState,
    formData: FormData
): Promise<FormState> {
    const validatedFields = CreateUser.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            ...state,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create new user.",
        };
    }

    const { name, email, password } = validatedFields.data;

    const existingUser = await sql`SELECT * FROM users WHERE email=${email}`;

    if (existingUser && existingUser.rowCount && existingUser.rowCount > 0) {
        return {
            ...state,
            errors: {
                email: ["Email already exists. Please use a different email."],
            },
            message: "Email already exists.",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data =
        await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword}) RETURNING *;`;
    const user = data.rows[0];

    if (!user) {
        return {
            message: "An error occurred while creating your account.",
        };
    }
    // 4. Create a session for the user
    const userId = user.id.toString();
    await createSession(userId);
    // redirect("/login");
}

// LOGIN SESSION

export async function authenticate(
    state: FormState,
    formData: FormData
): Promise<FormState> {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        ...state,
                        errors: {
                            general: "invalid credentials",
                        },
                    };
                default:
                    return {
                        ...state,
                        errors: {
                            general: "Something went wrong",
                        },
                    };
            }
        }
        throw error;
    }
}

export async function logout() {
    deleteSession();
}

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
export async function createPot(formData: FormData) {
    const { target, theme, name, total } = CreatePot.parse({
        target: formData.get("target"),
        theme: formData.get("theme"),
        name: formData.get("name"),
        total: formData.get("total"),
    });
    try {
        await sql`
        INSERT INTO pots (target, theme, name, total)
        VALUES (${target}, ${theme}, ${name} , ${total})`;

        // Update the balances table by reducing the current balance
        await sql`
         UPDATE balances
         SET current = current - ${total}
     `;
    } catch (error) {
        return {
            message: "Database Error: Failed to create pot",
        };
    }

    revalidatePath("/dashboard/pots");
    revalidatePath("/dashboard");
    redirect("/dashboard/pots");
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

// *****BUDGET ACTIONS*****
const FormSchema = z.object({
    id: z.string(),
    maximum: z.coerce
        .number()
        .gt(0, { message: "Please enter an amount greater than $0." }),
    category: z.string().min(1, "Category is required"),
    theme: z.string().min(1, "Category is required"),
});

export type State = {
    errors?: {
        maximum?: string[];
        category?: string[];
        theme?: string[];
    };
    message?: string | null;
};

const CreateBudget = FormSchema.omit({ id: true });
export async function createBudget(prevState: State, formData: FormData) {
    const validatedFields = CreateBudget.safeParse({
        maximum: formData.get("maximum"),
        category: formData.get("category"),
        theme: formData.get("theme"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Invoice.",
        };
    }

    const { maximum, category, theme } = validatedFields.data;
    try {
        await sql`
        INSERT INTO budgets (maximum, category, theme)
        VALUES (${maximum}, ${category}, ${theme})`;
    } catch (error) {
        return {
            message: "Database Error: Failed to create budget",
        };
    }
    revalidatePath("/dashboard/budgets");
    revalidatePath("/dashboard");
    redirect("/dashboard/budgets");
}

// update budget
const UpdateBudget = FormSchema.omit({ id: true, category: true });
export async function updateBudget(id: string, formData: FormData) {
    const { maximum, theme } = UpdateBudget.parse({
        maximum: formData.get("maximum"),
        // category: formData.get("category"),
        theme: formData.get("theme"),
    });

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

    revalidatePath("/dashboard/budgets");
    revalidatePath("/dashboard");
    redirect("/dashboard/budgets");
}

export async function deleteBudget(id: string) {
    // throw new Error('Failed to Delete budget');
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
