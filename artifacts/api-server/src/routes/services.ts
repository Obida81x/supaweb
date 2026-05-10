import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, servicesTable } from "@workspace/db";
import {
  CreateServiceBody,
  UpdateServiceParams,
  UpdateServiceBody,
  DeleteServiceParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/services", async (_req, res): Promise<void> => {
  const services = await db
    .select()
    .from(servicesTable)
    .orderBy(servicesTable.sortOrder);

  res.json(services.map((s) => ({ ...s, features: s.features ?? [] })));
});

router.post("/admin/services", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const parsed = CreateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [service] = await db
    .insert(servicesTable)
    .values({
      title: parsed.data.title,
      description: parsed.data.description,
      icon: parsed.data.icon,
      features: parsed.data.features ?? [],
      sortOrder: parsed.data.sortOrder ?? 0,
    })
    .returning();

  res.status(201).json({ ...service, features: service.features ?? [] });
});

router.patch("/admin/services/:id", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const paramsParsed = UpdateServiceParams.safeParse({ id: parseInt(raw, 10) });
  if (!paramsParsed.success) {
    res.status(400).json({ error: paramsParsed.error.message });
    return;
  }

  const bodyParsed = UpdateServiceBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = {};
  const b = bodyParsed.data;
  if (b.title !== undefined) updateData.title = b.title;
  if (b.description !== undefined) updateData.description = b.description;
  if (b.icon !== undefined) updateData.icon = b.icon;
  if (b.features !== undefined) updateData.features = b.features;
  if (b.sortOrder !== undefined) updateData.sortOrder = b.sortOrder;

  const [service] = await db
    .update(servicesTable)
    .set(updateData)
    .where(eq(servicesTable.id, paramsParsed.data.id))
    .returning();

  if (!service) {
    res.status(404).json({ error: "Service not found" });
    return;
  }

  res.json({ ...service, features: service.features ?? [] });
});

router.delete("/admin/services/:id", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const parsed = DeleteServiceParams.safeParse({ id: parseInt(raw, 10) });
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.delete(servicesTable).where(eq(servicesTable.id, parsed.data.id));
  res.sendStatus(204);
});

export default router;
