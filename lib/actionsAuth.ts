"use server";
import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import {
    FormState,
    RequestEmailFormState,
    ResetPasswordFormState,
    ResetPasswordSchema,
    User,
    signupSchema,
    authenticateSchema,
    ForgotPasswordSchema,
} from "./definitions";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "./session";
import { updateSchema } from "./db";

const resend = new Resend(process.env.RESEND_API_KEY);

// SIGN UP SECTION
const CreateUser = signupSchema.omit({ id: true });
export async function createUser(
    state: FormState,
    formData: FormData
): Promise<FormState> {
    //1.  valiidate form fields
    const validatedFields = CreateUser.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    //2. If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            ...state,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create new user.",
        };
    }

    //3. Check if the email already exists in the database
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

    //4. Hash the password and create a new user in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const data =
        await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword}) RETURNING *;`;
    const user = data.rows[0];

    if (!user) {
        return {
            message: "An error occurred while creating your account.",
        };
    }
    // 5. Create a session for the user
    const userId = user.id.toString();
    await createSession(userId);
}
// END OF SIGN UP SECTION

// LOGIN SESSION
const LoginUser = authenticateSchema.omit({});
export async function authenticate(
    state: FormState,
    formData: FormData
): Promise<FormState> {
    //1. Validate form fields
    const validatedFields = LoginUser.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    //2. If form validation fails, return errors early. Otherwise, continue.
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

        //3. If user is not found, return early
        if (!user) {
            return errorMessage;
        }
        //4. Compare the user's password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(
            validatedFields.data.password,
            user.password
        );

        //5. If the password does not match, return early
        if (!passwordMatch) {
            return errorMessage;
        }
        // 6. If login successful, create a session for the user and redirect
        const userId = user.id.toString();

        if (userId) {
            await createSession(userId);
        }

        return { ...state, success: true };
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
// END OF LOGIN SESSION

// LOGOUT SESSION
export async function logout() {
    await signOut({ redirectTo: "/login" });
    await deleteSession();
}
// END OF LOGOUT SESSION

// Forgot password - called by the forgot-password form
export async function requestPasswordReset(
    state: RequestEmailFormState,
    formData: FormData
): Promise<RequestEmailFormState> {
    //1. Ensure the schema is up to date
    await updateSchema();

    //2. Validate form fields
    const validatedFields = ForgotPasswordSchema.safeParse({
        email: formData.get("email"),
    });

    //3. If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            ...state,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid email. Failed to request password reset.",
            success: false,
        };
    }

    const { email } = validatedFields.data;

    try {
        //4. Check if the email exists in the database
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        if (user.rows.length === 0) {
            return {
                errors: {
                    email: ["No account found with this email address."],
                },
                success: false,
            };
        }

        //5. Generate a password reset token
        const resetToken = crypto.randomUUID();
        const resetTokenExpiry = new Date(Date.now() + 3600000); // Token expires in 1 hour

        //6. Save the reset token and expiry in the database
        console.log("Attempting SQL update");
        try {
            await sql`
            UPDATE users
            SET reset_token = ${resetToken}, reset_token_expiry = ${resetTokenExpiry.toISOString()}
            WHERE email = ${email}
        `;
        } catch (sqlError) {
            console.error("SQL Error:", sqlError);
            throw new Error("Database update failed");
        }

        console.log(resetToken, resetTokenExpiry);
        //7. Send password reset email
        await sendPasswordResetEmail(email, resetToken);

        return {
            message: "Password reset link sent to your email.",
            success: true,
        };
    } catch (error) {
        return {
            ...state,
            errors: {
                general: "A domain setup error occurred. Please try again.",
            },
            success: false,
        };
    }
}
// End of forgot password

// SEND PASSWORD RESET - called by the resetPasswordReset function
async function sendPasswordResetEmail(email: string, resetToken: string) {
    // Implement email sending logic here
    // You can use a service like SendGrid, AWS SES, or any other email service
    console.log(
        `Sending password reset email to ${email} with token ${resetToken}`
    );

    try {
        const appUrl = process.env.APP_URL ?? "http://localhost:3000"; // Fallback for local development
        const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

        const { data, error } = await resend.emails.send({
            from: "Chamu <admin@preprince.co.za>", // Replace with your verified sender delivered@resend.dev
            to: email,
            subject: "Reset Your Password",
            html: `
                <h1>Reset Your Password</h1>
                <p>You have requested to reset your password. Click the link below to set a new password:</p>
                <a href="${resetUrl}">Reset Password</a>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <p>This link will expire in 1 hour.</p>
            `,
        });

        if (error) {
            console.error("Error sending reset email:", error);
            throw new Error("Failed to send password reset email");
        }

        console.log("Reset email sent:", data);
        return { data };
    } catch (error) {
        console.error("Error in sendPasswordResetEmail:", error);
        throw new Error("Failed to send password reset email");
    }
}
// End of send password reset

// RESET PASSWORD - called by the reset-password form
export async function resetPassword(
    state: ResetPasswordFormState | undefined,
    formData: FormData
): Promise<ResetPasswordFormState> {
    // 1. Validate form fields
    const validatedFields = ResetPasswordSchema.safeParse({
        token: formData.get("token"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    // 2. If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            ...state,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid input. Failed to reset password.",
            success: false,
        };
    }

    const { token, password } = validatedFields.data;

    try {
        // 3. Check if the token is valid and not expired
        const result = await sql`
        SELECT * FROM users
        WHERE reset_token = ${token}
        AND reset_token_expiry > NOW()
      `;

        if (result.rows.length === 0) {
            return {
                errors: {
                    general: "Invalid or expired reset token",
                },
                success: false,
            };
        }

        const user = result.rows[0];

        // 4. Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Update the user's password and clear the reset token
        await sql`
        UPDATE users
        SET password = ${hashedPassword}, reset_token = NULL, reset_token_expiry = NULL
        WHERE id = ${user.id}
      `;

        // 6. If password reset is successful, return success state
        return { success: true, message: "Password reset successfully" };
    } catch (error) {
        console.error("Error resetting password:", error);
        return {
            errors: {
                general: "Failed to reset password. Please try again.",
            },
            success: false,
        };
    }
}
// End of reset password
