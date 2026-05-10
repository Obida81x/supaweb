import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const paymentMethodsTable = pgTable("payment_methods", {
  id: serial("id").primaryKey(),
  type: text("type").notNull().default("other"),
  label: text("label").notNull(),
  details: text("details").notNull().default(""),
  instructions: text("instructions").notNull().default(""),
  icon: text("icon").notNull().default("CreditCard"),
  active: boolean("active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PaymentMethod = typeof paymentMethodsTable.$inferSelect;
export type NewPaymentMethod = typeof paymentMethodsTable.$inferInsert;
