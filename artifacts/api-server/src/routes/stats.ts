import { Router, type IRouter } from "express";
import { eq, count, and } from "drizzle-orm";
import { db, projectsTable, servicesTable, testimonialsTable, contactMessagesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [[{ value: projectsCount }], [{ value: servicesCount }], [{ value: testimonialsCount }]] = await Promise.all([
    db.select({ value: count() }).from(projectsTable).where(eq(projectsTable.published, true)),
    db.select({ value: count() }).from(servicesTable),
    db.select({ value: count() }).from(testimonialsTable),
  ]);

  res.json({
    projectsCount: Number(projectsCount),
    servicesCount: Number(servicesCount),
    testimonialsCount: Number(testimonialsCount),
    yearsActive: 5,
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
