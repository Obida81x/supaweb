import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const socialLinksTable = pgTable("social_links", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  icon: text("icon").notNull().default("Link"),
  url: text("url").notNull(),
  active: boolean("active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SocialLink = typeof socialLinksTable.$inferSelect;
export type NewSocialLink = typeof socialLinksTable.$inferInsert;
