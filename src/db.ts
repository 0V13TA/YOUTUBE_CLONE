import { drizzle } from "drizzle-orm/postgres-js";
import { Pool } from "pg";
import { config } from "dotenv";
import * as schema from "./schema/schema"; // Adjust the path to your schema file

// Load environment variables from .env file
config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Environment variable DATABASE_URL must be set.");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  max: 10, // Adjust based on your needs
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000 // Return an error after 2 seconds if connection could not be established
});

export const db = drizzle(pool, { schema });
