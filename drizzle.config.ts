import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL! // PostgreSQL connection string
  }
} satisfies Config;
