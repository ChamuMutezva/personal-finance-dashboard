import { sql } from "@vercel/postgres";
// import { formatCurrency } from "./utils";
//User
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
       
        // const generalCategoryPromise  = await sql<Transaction>`SELECT * FROM transactions WHERE category = 'General'`
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

const ITEMS_PER_PAGE = 8;
export async function fetchFilteredTransactions(
    query: string,
    currentPage: number
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const transactions = await sql<Transaction>`
        SELECT * FROM transactions
        WHERE
             transactions.name ILIKE ${`%${query}%`} OR
             transactions.category ILIKE ${`%${query}%`} OR
             transactions.amount::text ILIKE ${`%${query}%`} OR
             transactions.date::text ILIKE ${`%${query}%`} OR
             transactions.recurring::text ILIKE ${`%${query}%`}
        ORDER BY
              transactions.date DESC        
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

/*
export async function fetchLatestInvoices() {
    try {
        const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

        const latestInvoices = data.rows.map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));
        return latestInvoices;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the latest invoices.");
    }
}

export async function fetchCardData() {
    try {
        // You can probably combine these into a single SQL query
        // However, we are intentionally splitting them to demonstrate
        // how to initialize multiple queries in parallel with JS.
        const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise,
        ]);

        const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
        const numberOfCustomers = Number(data[1].rows[0].count ?? "0");

        const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0");
        const totalPendingInvoices = formatCurrency(
            data[2].rows[0].pending ?? "0"
        );

        return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices,
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch card data.");
    }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
    query: string,
    currentPage: number
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

        return invoices.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch invoices.");
    }
}

export async function fetchInvoicesPages(query: string) {
    try {
        const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

        const totalPages = Math.ceil(
            Number(count.rows[0].count) / ITEMS_PER_PAGE
        );
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of invoices.");
    }
}

export async function fetchInvoiceById(id: string) {
    try {
        const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

        const invoice = data.rows.map((invoice) => ({
            ...invoice,
            // Convert amount from cents to dollars
            amount: invoice.amount / 100,
        }));

        return invoice[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch invoice.");
    }
}

export async function fetchCustomers() {
    try {
        const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

        const customers = data.rows;
        return customers;
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to fetch all customers.");
    }
}

export async function fetchFilteredCustomers(query: string) {
    try {
        const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

        const customers = data.rows.map((customer) => ({
            ...customer,
            total_pending: formatCurrency(customer.total_pending),
            total_paid: formatCurrency(customer.total_paid),
        }));

        return customers;
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to fetch customer table.");
    }
}
    */