import { z } from "zod";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type SessionPayload = {
    userId: string,
    expires: Date,
  //  role: "admin" || "user",
}

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
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
export const CreatePotFormSchema = z.object({
    id: z.string(),
    name: z.string().max(30, "Name is required"),
    target: z.coerce.number(),
    total: z.coerce.number(),
    theme: z.string(),
});


// UPDATE A POT
export const UpdatePotFormSchema = z.object({
    id: z.string(),
    name: z.string().max(30, "Name is required"),
    target: z.coerce.number(),
    total: z.coerce.number(),
    theme: z.string(),
});
