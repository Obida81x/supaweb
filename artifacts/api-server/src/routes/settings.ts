import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db, adminUsersTable, siteSettingsTable } from "@workspace/db";

const router: IRouter = Router();

function requireAdmin(req: any, res: any): boolean {
  if (!(req.session as any)?.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

async function getOrCreateSettings() {
  const rows = await db.select().from(siteSettingsTable).limit(1);
  if (rows.length > 0) return rows[0];
  const [created] = await db.insert(siteSettingsTable).values({ yearsActive: 5 }).returning();
  return created;
}

router.get("/admin/settings", async (req, res): Promise<void> => {
  if (!requireAdmin(req, res)) return;
  const settings = await getOrCreateSettings();
  res.json({
    yearsActive: settings.yearsActive,
    customProjectsCount: settings.customProjectsCount ?? null,
    customClientsCount: settings.customClientsCount ?? null,
    customServicesCount: settings.customServicesCount ?? null,
  });
});

router.patch("/admin/settings", async (req, res): Promise<void> => {
  if (!requireAdmin(req, res)) return;
  const settings = await getOrCreateSettings();
  const { yearsActive, customProjectsCount, customClientsCount, customServicesCount } = req.body;
  const [updated] = await db
    .update(siteSettingsTable)
    .set({
      ...(yearsActive !== undefined ? { yearsActive: Number(yearsActive) } : {}),
      ...(customProjectsCount !== undefined ? { customProjectsCount: customProjectsCount === null ? null : Number(customProjectsCount) } : {}),
      ...(customClientsCount !== undefined ? { customClientsCount: customClientsCount === null ? null : Number(customClientsCount) } : {}),
      ...(customServicesCount !== undefined ? { customServicesCount: customServicesCount === null ? null : Number(customServicesCount) } : {}),
      updatedAt: new Date(),
    })
    .where(eq(siteSettingsTable.id, settings.id))
    .returning();
  res.json({
    yearsActive: updated.yearsActive,
    customProjectsCount: updated.customProjectsCount ?? null,
    customClientsCount: updated.customClientsCount ?? null,
    customServicesCount: updated.customServicesCount ?? null,
  });
});

router.post("/admin/change-password", async (req, res): Promise<void> => {
  const adminId = (req.session as any)?.adminId;
  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { currentPassword, newEmail, newPassword } = req.body;
  if (!currentPassword) {
    res.status(400).json({ error: "Current password is required" });
    return;
  }

  const [admin] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.id, adminId));
  if (!admin) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!valid) {
    res.status(400).json({ error: "Current password is incorrect" });
    return;
  }

  const updates: Record<string, any> = {};
  if (newEmail && newEmail !== admin.email) updates.email = newEmail;
  if (newPassword) updates.passwordHash = await bcrypt.hash(newPassword, 12);

  if (Object.keys(updates).length === 0) {
    res.json({ id: admin.id, email: admin.email });
    return;
  }

  const [updated] = await db.update(adminUsersTable).set(updates).where(eq(adminUsersTable.id, adminId)).returning();
  res.json({ id: updated.id, email: updated.email });
});

export default router;
