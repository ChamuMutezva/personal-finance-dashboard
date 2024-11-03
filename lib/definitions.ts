export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type FormState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string;
};

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
