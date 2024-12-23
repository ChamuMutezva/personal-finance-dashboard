import { z } from "zod";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type SessionPayload = {
    userId: string;
    expires: Date;
    //  role: "admin" || "user",
};

export type FormState =
    | {
          errors?: {
              name?: string[];
              email?: string[];
              password?: string[];
              general?: string;
          };
          message?: string;
      }
    | undefined;

export type Balance = {
    current: number;
    income: number;
    expenses: number;
};

export type Transaction = {
    id: string;
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    recurring: boolean;
};

export type Budget = {
    id: string;
    category: string;
    maximum: number;
    theme: string;
};

export type BudgetState = {
    errors?: {
        maximum?: string[];
        category?: string[];
        theme?: string[];
    };
    message?: string | null;
};


export const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

export const BudgetFormSchema = z.object({
    id: z.string(),
    maximum: z.coerce
        .number({
            required_error: "Maximum is required",
            invalid_type_error: "Maximum must be a string",
        })
        .positive("Target must Must be greater than 0"),
    category: z
        .string({
            required_error: "Category is required",
            invalid_type_error: "Category must be a string",
        })
        .min(1, "Category is required"),
    theme: z
        .string({
            required_error: "Theme is required",
            invalid_type_error: "Theme must be a string",
        })
        .min(1, "Select a theme"),
});

export type Pot = {
    id: string;
    name: string;
    target: number;
    total: number;
    theme: string;
};

// SignUp schema
export const signupSchema = z.object({
    id: z.string(),
    name: z
        .string()
        .min(2, { message: "Name must be 2 or more characters long" }),
    email: z.string().email(),
    password: z
        .string()
        .min(6, { message: "Password must be 6 characters or more" }),
});

// login schema
export const authenticateSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." }),
});

// WITHDRAW MONEY FROM POT
export const WithdrawMoneyFromPotFormSchema = z.object({
    id: z.string(),
    name: z.string().max(30, "Name is required"),
    target: z.coerce.number(),
    total: z.coerce.number(),
    theme: z.string(),
});

// ADD MONEY TO POT
export const AddMoneyToPotFormSchema = z.object({
    id: z.string(),
    name: z.string().max(30, "Name is required"),
    target: z.coerce.number(),
    total: z.coerce.number(),
    theme: z.string(),
});

// CREATE A POT
export type PotFormState =
    | {
          errors?: {
              name?: string[];
              target?: string[];
              total?: string[];
              theme?: string[];
              general?: string;
          };
          message?: string;
      }
    | undefined;

export const CreatePotFormSchema = z.object({
    id: z.string(),
    name: z
        .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
        .min(1, "Enter a valid name")
        .max(30, "Name is required"),
    target: z.coerce
        .number({
            required_error: "Target  is required",
            invalid_type_error: "Target must be a number",
        })
        .positive("Target must Must be greater than 0"),
    total: z.coerce
        .number({
            required_error: "Total  is required",
            invalid_type_error: "Total must be a number",
        })
        .positive("Total must be greater that 0"),
    theme: z
        .string({
            required_error: "Theme is required",
            invalid_type_error: "Theme must be a string",
        })
        .min(1, "Select a theme"),
});

// UPDATE A POT
export const UpdatePotFormSchema = z.object({
    id: z.string(),
    name: z.string().max(30, "Name is required"),
    target: z.coerce
        .number({
            required_error: "Target  is required",
            invalid_type_error: "Target must be a number",
        })
        .positive("Total must be greater that 0"),
    total: z.coerce.number(),
    theme: z.string(),
});
