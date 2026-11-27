import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

// One row per message sent through the site's contact form.
// Change this file, then run `npm run db:generate` to write a new migration in ./drizzle.
export const contactMessages = pgTable('contact_messages', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull(),
  message: text().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type NewContactMessage = typeof contactMessages.$inferInsert;
