import { sql } from "@vercel/postgres";
// import { formatCurrency } from "./utils";
import { Balance, User, Pot, Budget, Transaction } from "./definitions";

export async function fetchBalance() {
    try {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)

        console.log("Fetching balance data...");
        //  await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await sql<Balance>`SELECT * FROM balances`;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch balance data.");
    }
}

export async function fetchTransactions() {
    try {
        console.log("Fetching transactions data...");

        const data = await sql<Transaction>`SELECT * FROM transactions`;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch transactions data.");
    }
}

export async function fetchBudgets() {
    try {
        console.log("Fetching budgets data...");

        const data = await sql<Budget>`SELECT * FROM budgets`;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch budgets data.");
    }
}

export async function fetchPots() {
    try {
        console.log("Fetching pots data...");

        const data = await sql<Pot>`SELECT * FROM pots`;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch pots data.");
    }
}

export async function fetchByCategory() {
    try {
        console.log("Fetching transactions by category");

        // const generalCategoryPromise  = await sql<Transaction>`SELECT * FROM transactions WHERE category = 'General'`
        const diningCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Dining Out'`;
        const personalCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Personal Care'`;
        const billsCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Bills'`;
        const entertainmentCategoryPromise =
            await sql<Transaction>`SELECT * FROM transactions WHERE category = 'Entertainment'`;

        const data = await Promise.all([
            diningCategoryPromise,
            personalCategoryPromise,
            billsCategoryPromise,
            entertainmentCategoryPromise,
        ]);

        const diningCategory = data[0].rows;
        const personalCategory = data[1].rows;
        const billsCategory = data[2].rows;
        const entertainmentCategory = data[3].rows;
        return {
            diningCategory,
            personalCategory,
            billsCategory,
            entertainmentCategory,
        };

        // return data.rows
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch category data.");
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
