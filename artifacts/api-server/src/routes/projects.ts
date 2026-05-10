import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, projectsTable } from "@workspace/db";
import {
  ListProjectsQueryParams,
  GetProjectParams,
  CreateProjectBody,
  UpdateProjectParams,
  UpdateProjectBody,
  DeleteProjectParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/projects", async (req, res): Promise<void> => {
  const params = ListProjectsQueryParams.safeParse(req.query);
  const category = params.success ? params.data.category : undefined;

  const conditions = [eq(projectsTable.published, true)];
  if (category) {
    conditions.push(eq(projectsTable.category, category));
  }

  const projects = await db
    .select()
    .from(projectsTable)
    .where(and(...conditions))
    .orderBy(projectsTable.createdAt);

  res.json(projects.map((p) => ({
    ...p,
    technologies: p.technologies ?? [],
    createdAt: p.createdAt.toISOString(),
  })));
});

router.get("/projects/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const parsed = GetProjectParams.safeParse({ id: parseInt(raw, 10) });
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [project] = await db
    .select()
    .from(projectsTable)
    .where(and(eq(projectsTable.id, parsed.data.id), eq(projectsTable.published, true)));

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json({ ...project, technologies: project.technologies ?? [], createdAt: project.createdAt.toISOString() });
});

// Admin project routes
router.get("/admin/projects", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const projects = await db
    .select()
    .from(projectsTable)
    .orderBy(projectsTable.createdAt);

  res.json(projects.map((p) => ({
    ...p,
    technologies: p.technologies ?? [],
    createdAt: p.createdAt.toISOString(),
  })));
});

router.post("/admin/projects", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const parsed = CreateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [project] = await db
    .insert(projectsTable)
    .values({
      title: parsed.data.title,
      description: parsed.data.description,
      imageUrl: parsed.data.imageUrl ?? null,
      technologies: parsed.data.technologies ?? [],
      category: parsed.data.category,
      liveUrl: parsed.data.liveUrl ?? null,
      githubUrl: parsed.data.githubUrl ?? null,
      featured: parsed.data.featured ?? false,
      published: parsed.data.published ?? true,
    })
    .returning();

  res.status(201).json({ ...project, technologies: project.technologies ?? [], createdAt: project.createdAt.toISOString() });
});

router.patch("/admin/projects/:id", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const paramsParsed = UpdateProjectParams.safeParse({ id: parseInt(raw, 10) });
  if (!paramsParsed.success) {
    res.status(400).json({ error: paramsParsed.error.message });
    return;
  }

  const bodyParsed = UpdateProjectBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = {};
  const b = bodyParsed.data;
  if (b.title !== undefined) updateData.title = b.title;
  if (b.description !== undefined) updateData.description = b.description;
  if (b.imageUrl !== undefined) updateData.imageUrl = b.imageUrl;
  if (b.technologies !== undefined) updateData.technologies = b.technologies;
  if (b.category !== undefined) updateData.category = b.category;
  if (b.liveUrl !== undefined) updateData.liveUrl = b.liveUrl;
  if (b.githubUrl !== undefined) updateData.githubUrl = b.githubUrl;
  if (b.featured !== undefined) updateData.featured = b.featured;
  if (b.published !== undefined) updateData.published = b.published;

  const [project] = await db
    .update(projectsTable)
    .set(updateData)
    .where(eq(projectsTable.id, paramsParsed.data.id))
    .returning();

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json({ ...project, technologies: project.technologies ?? [], createdAt: project.createdAt.toISOString() });
});

router.delete("/admin/projects/:id", async (req, res): Promise<void> => {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const parsed = DeleteProjectParams.safeParse({ id: parseInt(raw, 10) });
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.delete(projectsTable).where(eq(projectsTable.id, parsed.data.id));
  res.sendStatus(204);
});

export default router;
