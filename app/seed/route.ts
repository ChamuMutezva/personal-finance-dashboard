import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import {
    transactions,
    balances,
    budgets,
    pots,
    users,
} from "../lib/placeholder-data";

const client = await db.connect();

async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
        })
    );

    return insertedUsers;
}

async function seedBalances() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS balances (         
         current NUMERIC(10, 2) NOT NULL,
         income NUMERIC(10, 2) NOT NULL,
         expenses NUMERIC(10, 2) NOT NULL
        );
        `;

    const insertedBalances = await Promise.all(
        balances.map(
            async (balance) => client.sql`
    INSERT INTO balances ( current, income, expenses)
    VALUES (${balance.current}, ${balance.income}, ${balance.expenses})       
     `
        )
    );
    return insertedBalances;
}

async function seedTransactions() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,    
      avatar VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      amount NUMERIC(10, 2) NOT NULL,    
      recurring BOOLEAN NOT NULL
    );
  `;

    const insertedTransactions = await Promise.all(
        transactions.map(
            async (transaction) => client.sql`
        INSERT INTO transactions (id, avatar, name, category, date, amount, recurring)
        VALUES (${transaction.id}, ${transaction.avatar}, ${transaction.name}, ${transaction.category}, ${transaction.date}, ${transaction.amount}, ${transaction.recurring})
        ON CONFLICT (id) DO NOTHING;
      `
        )
    );

    return insertedTransactions;
}

async function seedBudgets() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS budgets (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      maximum NUMERIC(10, 2) NOT NULL,
      theme VARCHAR(255) NOT NULL
    );
  `;

    const insertedBudgets = await Promise.all(
        budgets.map(
            async (budget) => client.sql`
        INSERT INTO budgets (id, category, maximum, theme)
        VALUES (${budget.id}, ${budget.category}, ${budget.maximum}, ${budget.theme})
        ON CONFLICT (id) DO NOTHING;
      `
        )
    );

    return insertedBudgets;
}

async function seedPots() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
    CREATE TABLE IF NOT EXISTS pots (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      target INT NOT NULL,
      total INT NOT NULL,
      theme VARCHAR(255) NOT NULL
    );
  `;

    const insertedPots = await Promise.all(
        pots.map(
            async (pot) => client.sql`
        INSERT INTO pots (id, name, target, total, theme)
        VALUES (${pot.id}, ${pot.name}, ${pot.target}, ${pot.total}, ${pot.theme})
        ON CONFLICT (id) DO NOTHING;
      `
        )
    );

    return insertedPots;
}

export async function GET() {  
    
    try {
        await client.sql`BEGIN`;
        await seedUsers();
        await seedBalances();
        await seedTransactions();
        await seedBudgets();
        await seedPots();
        await client.sql`COMMIT`;
        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
        
}