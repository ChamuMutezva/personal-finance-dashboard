"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
    Pot,
    FormState,
    PotFormState,
    BudgetState,
    User,
    signupSchema,
    authenticateSchema,
    WithdrawMoneyFromPotFormSchema,
    AddMoneyToPotFormSchema,
    CreatePotFormSchema,
    UpdatePotFormSchema,
    BudgetFormSchema,
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
const LoginUser = authenticateSchema.omit({});
export async function authenticate(
    state: FormState,
    formData: FormData
): Promise<FormState> {
    const validatedFields = LoginUser.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            ...state,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to login.",
        };
    }
    const errorMessage = { message: "Invalid login credentials." };

    try {
        const user = (await signIn("credentials", formData)) as User;

        // If user is not found, return early
        if (!user) {
            return errorMessage;
        }
        // 3. Compare the user's password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(
            validatedFields.data.password,
            user.password
        );

        // If the password does not match, return early
        if (!passwordMatch) {
            return errorMessage;
        }
        // 4. If login successful, create a session for the user and redirect
        const userId = user.id.toString();
        await createSession(userId);
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
        // redirect("/dashboard/pots");
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
        //  redirect("/dashboard/budgets");
        return { message: "success" };
    } catch (error) {
        return {
            message: "Database Error: Failed to create budget",
        };
    }
}

// update budget
const UpdateBudget = BudgetFormSchema.omit({ id: true, category: true, theme: true });
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
