import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, socialLinksTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/social-links", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(socialLinksTable)
    .where(eq(socialLinksTable.active, true))
    .orderBy(asc(socialLinksTable.sortOrder));
  res.json(rows);
});

router.get("/admin/social-links", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const rows = await db.select().from(socialLinksTable).orderBy(asc(socialLinksTable.sortOrder));
  res.json(rows);
});

router.post("/admin/social-links", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const { label, icon, url, active, sortOrder } = req.body;
  if (!label || !url) { res.status(400).json({ error: "label and url are required" }); return; }
  const [row] = await db
    .insert(socialLinksTable)
    .values({ label, icon: icon || "Link", url, active: active ?? true, sortOrder: sortOrder ?? 0 })
    .returning();
  res.status(201).json(row);
});

router.patch("/admin/social-links/:id", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const id = Number(req.params.id);
  const { label, icon, url, active, sortOrder } = req.body;
  const updates: Record<string, unknown> = {};
  if (label !== undefined) updates.label = label;
  if (icon !== undefined) updates.icon = icon;
  if (url !== undefined) updates.url = url;
  if (active !== undefined) updates.active = active;
  if (sortOrder !== undefined) updates.sortOrder = sortOrder;
  const [row] = await db.update(socialLinksTable).set(updates).where(eq(socialLinksTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/admin/social-links/:id", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const id = Number(req.params.id);
  const [row] = await db.delete(socialLinksTable).where(eq(socialLinksTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).send();
});

export default router;
