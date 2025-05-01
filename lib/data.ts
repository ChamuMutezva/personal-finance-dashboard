import { sql } from "@vercel/postgres";
import { Balance, Pot, Budget, Transaction } from "./definitions";

export const colors = [
    { color: "Green", hex: "#277c78" },
    { color: "Magenta", hex: "#934F6F" },
    { color: "Yellow", hex: "#F2CDAC" },
    { color: "Cyan", hex: "#B2C907" },
    { color: "Blue", hex: "#3F82B2" },
    { color: "Purple", hex: "#826CB0" },
    { color: "Red", hex: "#C94736" },
    { color: "Navy", hex: "#626070" },
    { color: "Light purple", hex: "#AF81BA" },
    { color: "Turquoise", hex: "#597C7C" },
    { color: "Brown", hex: "#93674F" },
    { color: "Navy grey", hex: "#97A0AC" },
    { color: "Orange", hex: "#BE6C49" },
    { color: "Gold", hex: "#CAB361" },
    { color: "Army green", hex: "#7F9161" },
];

export const categories = [
    { category: "Entertainment" },
    { category: "Bills" },
    { category: "Groceries" },
    { category: "Dining Out" },
    { category: "Transportation" },
    { category: "Personal Care" },
    { category: "Education" },
    { category: "Lifestyle" },
    { category: "Shopping" },
    { category: "General" },
];

export async function fetchBills() {
    try {
        const data = await sql<Transaction>`SELECT DISTINCT * FROM transactions
       WHERE category = 'Bills'`;
        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch balance data.");
    }
}

export async function fetchBalance() {
    try {
        const data = await sql<Balance>`SELECT * FROM balances`;
        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch balance data.");
    }
}

export async function fetchTransactions() {
    try {
        const data = await sql<Transaction>`SELECT * FROM transactions`;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch transactions data.");
    }
}

export async function fetchBudgets() {
    try {
        const data = await sql<Budget>`SELECT * FROM budgets`;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch budgets data.");
    }
}

export async function fetchPots() {
    try {
        const data = await sql<Pot>`SELECT * FROM pots`;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch pots data.");
    }
}
export async function fetchByCategoryExtendedExp(query: string) {
    try {
        const data =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = ${query}`;
        const extendedTrialCategory = data.rows;
        return extendedTrialCategory;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error(
            "Failed to fetch category data in the amended version."
        );
    }
}
export async function fetchByCategory() {
    try {
        const diningCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Dining Out'`;
        const personalCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Personal Care'`;
        const billsCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Bills'`;
        const entertainmentCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Entertainment'`;
        const groceriesCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Groceries'`;
        const transportationCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Transportation'`;
        const educationCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Education'`;
        const lifestyleCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Lifestyle'`;
        const shoppingCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Shopping'`;
        const generalCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'General'`;

        const data = await Promise.all([
            diningCategoryPromise,
            personalCategoryPromise,
            billsCategoryPromise,
            entertainmentCategoryPromise,
            groceriesCategoryPromise,
            transportationCategoryPromise,
            educationCategoryPromise,
            lifestyleCategoryPromise,
            shoppingCategoryPromise,
            generalCategoryPromise,
        ]);

        const diningCategory = data[0].rows;
        const personalCategory = data[1].rows;
        const billsCategory = data[2].rows;
        const entertainmentCategory = data[3].rows;
        const groceriesCategory = data[4].rows;
        const transportationCategory = data[5].rows;
        const educationCategory = data[6].rows;
        const lifestyleCategory = data[7].rows;
        const shoppingCategory = data[8].rows;
        const generalCategory = data[9].rows;
        return {
            diningCategory,
            personalCategory,
            billsCategory,
            entertainmentCategory,
            groceriesCategory,
            transportationCategory,
            educationCategory,
            lifestyleCategory,
            shoppingCategory,
            generalCategory,
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch category data.");
    }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredTransactions(
    query: string,
    currentPage: number,
    sortBy: string
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    // Map frontend sort options to SQL clauses
    const sortMapping: { [key: string]: string } = {
        Latest: "transactions.date DESC",
        Oldest: "transactions.date ASC",
        "A to Z": "transactions.name ASC",
        "Z to A": "transactions.name DESC",
        Highest: "transactions.amount DESC",
        Lowest: "transactions.amount ASC",
    };

    try {
        const transactions = await sql<Transaction>`
        SELECT * FROM transactions
        WHERE
             transactions.name ILIKE ${`%${query}%`} OR
             transactions.category ILIKE ${`%${query}%`} OR
             transactions.amount::text ILIKE ${`%${query}%`} OR
             transactions.date::text ILIKE ${`%${query}%`} OR
             transactions.recurring::text ILIKE ${`%${query}%`}
        ORDER BY ${sortMapping[sortBy] || "transactions.date DESC"}      
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

        return transactions.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch transactions.");
    }
}

export async function fetchTransactionsPages(query: string) {
    try {
        const count = await sql`SELECT COUNT(*)
    FROM transactions  
    WHERE
      transactions.name ILIKE ${`%${query}%`} OR
      transactions.category ILIKE ${`%${query}%`} OR
      transactions.amount::text ILIKE ${`%${query}%`} OR
      transactions.date::text ILIKE ${`%${query}%`} OR
      transactions.recurring::text ILIKE ${`%${query}%`}   
  `;

        const totalPages = Math.ceil(
            Number(count.rows[0].count) / ITEMS_PER_PAGE
        );
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of Transactions.");
    }
}

export async function fetchBudgetById(id: string) {
    try {
        const data = await sql<Budget>`
      SELECT
        budgets.id,
        budgets.maximum,
        budgets.theme,
        budgets.category
      FROM budgets
      WHERE budgets.id = ${id};
    `;

        const budget = data.rows.map((budget) => ({
            ...budget,
        }));

        return budget[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch budget.");
    }
}

export async function fetchRecurringBills() {
    try {
        const data =
            await sql<Transaction>`SELECT DISTINCT ON (name) * FROM transactions WHERE recurring = true ORDER BY name, date`;
        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch transactions data.");
    }
}
