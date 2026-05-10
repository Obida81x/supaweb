import { pgTable, integer, serial, timestamp } from "drizzle-orm/pg-core";

export const siteSettingsTable = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  yearsActive: integer("years_active").notNull().default(5),
  customProjectsCount: integer("custom_projects_count"),
  customClientsCount: integer("custom_clients_count"),
  customServicesCount: integer("custom_services_count"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SiteSettings = typeof siteSettingsTable.$inferSelect;
