import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema',         // folder where your schema files will go
  out: './drizzle/migrations',    // folder for generated SQL migration files
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!, // or hardcode the string here
  },
} satisfies Config;
