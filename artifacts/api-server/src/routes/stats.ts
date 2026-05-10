import { Router, type IRouter } from "express";
import { eq, count } from "drizzle-orm";
import { db, projectsTable, servicesTable, testimonialsTable, contactMessagesTable, siteSettingsTable } from "@workspace/db";

const router: IRouter = Router();

async function getSettings() {
  const rows = await db.select().from(siteSettingsTable).limit(1);
  if (rows.length > 0) return rows[0];
  const [created] = await db.insert(siteSettingsTable).values({ yearsActive: 5 }).returning();
  return created;
}

router.get("/stats", async (_req, res): Promise<void> => {
  const [[{ value: projectsCount }], [{ value: servicesCount }], [{ value: testimonialsCount }], settings] = await Promise.all([
    db.select({ value: count() }).from(projectsTable).where(eq(projectsTable.published, true)),
    db.select({ value: count() }).from(servicesTable),
    db.select({ value: count() }).from(testimonialsTable),
    getSettings(),
  ]);

  res.json({
    projectsCount: settings.customProjectsCount ?? Number(projectsCount),
    servicesCount: settings.customServicesCount ?? Number(servicesCount),
    testimonialsCount: settings.customClientsCount ?? Number(testimonialsCount),
    yearsActive: settings.yearsActive,
  });
});

router.get("/admin/stats", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const [
    [{ value: projectsCount }],
    [{ value: servicesCount }],
    [{ value: testimonialsCount }],
    [{ value: messagesCount }],
    [{ value: unreadMessagesCount }],
    [{ value: featuredProjectsCount }],
    [{ value: publishedProjectsCount }],
  ] = await Promise.all([
    db.select({ value: count() }).from(projectsTable),
    db.select({ value: count() }).from(servicesTable),
    db.select({ value: count() }).from(testimonialsTable),
    db.select({ value: count() }).from(contactMessagesTable),
    db.select({ value: count() }).from(contactMessagesTable).where(eq(contactMessagesTable.read, false)),
    db.select({ value: count() }).from(projectsTable).where(eq(projectsTable.featured, true)),
    db.select({ value: count() }).from(projectsTable).where(eq(projectsTable.published, true)),
  ]);

  res.json({
    projectsCount: Number(projectsCount),
    servicesCount: Number(servicesCount),
    testimonialsCount: Number(testimonialsCount),
    messagesCount: Number(messagesCount),
    unreadMessagesCount: Number(unreadMessagesCount),
    featuredProjectsCount: Number(featuredProjectsCount),
    publishedProjectsCount: Number(publishedProjectsCount),
  });
});

export default router;
