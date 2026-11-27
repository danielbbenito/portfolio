import { defineConfig } from 'drizzle-kit';

// drizzle-kit reads the schema and writes SQL migration files into ./drizzle.
// The app applies them itself on startup (src/db/database.module.ts).
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
});
