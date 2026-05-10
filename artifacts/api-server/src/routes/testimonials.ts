import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, testimonialsTable } from "@workspace/db";
import {
  CreateTestimonialBody,
  UpdateTestimonialParams,
  UpdateTestimonialBody,
  DeleteTestimonialParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/testimonials", async (_req, res): Promise<void> => {
  const testimonials = await db
    .select()
    .from(testimonialsTable)
    .orderBy(testimonialsTable.createdAt);

  res.json(testimonials.map((t) => ({ ...t, createdAt: t.createdAt.toISOString() })));
});

router.post("/admin/testimonials", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const parsed = CreateTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [testimonial] = await db
    .insert(testimonialsTable)
    .values({
      name: parsed.data.name,
      role: parsed.data.role,
      company: parsed.data.company,
      content: parsed.data.content,
      avatarUrl: parsed.data.avatarUrl ?? null,
      rating: parsed.data.rating ?? 5,
    })
    .returning();

  res.status(201).json({ ...testimonial, createdAt: testimonial.createdAt.toISOString() });
});

router.patch("/admin/testimonials/:id", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const paramsParsed = UpdateTestimonialParams.safeParse({ id: parseInt(raw, 10) });
  if (!paramsParsed.success) {
    res.status(400).json({ error: paramsParsed.error.message });
    return;
  }

  const bodyParsed = UpdateTestimonialBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = {};
  const b = bodyParsed.data;
  if (b.name !== undefined) updateData.name = b.name;
  if (b.role !== undefined) updateData.role = b.role;
  if (b.company !== undefined) updateData.company = b.company;
  if (b.content !== undefined) updateData.content = b.content;
  if (b.avatarUrl !== undefined) updateData.avatarUrl = b.avatarUrl;
  if (b.rating !== undefined) updateData.rating = b.rating;

  const [testimonial] = await db
    .update(testimonialsTable)
    .set(updateData)
    .where(eq(testimonialsTable.id, paramsParsed.data.id))
    .returning();

  if (!testimonial) {
    res.status(404).json({ error: "Testimonial not found" });
    return;
  }

  res.json({ ...testimonial, createdAt: testimonial.createdAt.toISOString() });
});

router.delete("/admin/testimonials/:id", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const parsed = DeleteTestimonialParams.safeParse({ id: parseInt(raw, 10) });
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, parsed.data.id));
  res.sendStatus(204);
});

export default router;
