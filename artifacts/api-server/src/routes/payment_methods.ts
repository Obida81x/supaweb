import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, paymentMethodsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/payment-methods", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(paymentMethodsTable)
    .where(eq(paymentMethodsTable.active, true))
    .orderBy(asc(paymentMethodsTable.sortOrder));
  res.json(rows);
});

router.get("/admin/payment-methods", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const rows = await db.select().from(paymentMethodsTable).orderBy(asc(paymentMethodsTable.sortOrder));
  res.json(rows);
});

router.post("/admin/payment-methods", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const { type, label, details, instructions, icon, active, sortOrder } = req.body;
  if (!label || !type) { res.status(400).json({ error: "label and type are required" }); return; }
  const [row] = await db
    .insert(paymentMethodsTable)
    .values({ type, label, details: details || "", instructions: instructions || "", icon: icon || "CreditCard", active: active ?? true, sortOrder: sortOrder ?? 0 })
    .returning();
  res.status(201).json(row);
});

router.patch("/admin/payment-methods/:id", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const id = Number(req.params.id);
  const { type, label, details, instructions, icon, active, sortOrder } = req.body;
  const updates: Record<string, unknown> = {};
  if (type !== undefined) updates.type = type;
  if (label !== undefined) updates.label = label;
  if (details !== undefined) updates.details = details;
  if (instructions !== undefined) updates.instructions = instructions;
  if (icon !== undefined) updates.icon = icon;
  if (active !== undefined) updates.active = active;
  if (sortOrder !== undefined) updates.sortOrder = sortOrder;
  const [row] = await db.update(paymentMethodsTable).set(updates).where(eq(paymentMethodsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/admin/payment-methods/:id", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const id = Number(req.params.id);
  const [row] = await db.delete(paymentMethodsTable).where(eq(paymentMethodsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).send();
});

export default router;
