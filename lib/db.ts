import { sql } from "@vercel/postgres"

export async function updateSchema() {
  try {
    await sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
      ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP
    `
    console.log("Schema updated successfully")
  } catch (error) {
    console.error("Error updating schema:", error)
    throw error
  }
}

