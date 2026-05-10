# Deployment Guide

SupaWeb uses a split deployment:
- **Frontend** → [Vercel](https://vercel.com) (static React + Vite build)
- **Backend API** → [Render](https://render.com) (Node.js Express server)
- **Database** → [Neon](https://neon.tech) (serverless PostgreSQL)

---

## 1. Database — Neon PostgreSQL

1. Sign up at [neon.tech](https://neon.tech) and create a new project.
2. Copy the **Connection String** from the dashboard (includes `?sslmode=require`).
3. Run the schema migrations against Neon before launching the backend:
   ```bash
   DATABASE_URL=<neon-url> pnpm --filter @workspace/db run push
   ```
4. Seed the database (admin user, sample services, projects, testimonials):
   ```bash
   DATABASE_URL=<neon-url> pnpm --filter @workspace/db run seed
   ```

---

## 2. Backend — Render

### First deploy

1. Push this repo to GitHub.
2. Go to [render.com](https://render.com) → **New → Web Service**.
3. Connect your GitHub repo.
4. Render will detect `render.yaml` automatically — confirm the settings.
5. Set the following **Environment Variables** in Render's dashboard:

   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | Your Neon connection string |
   | `SESSION_SECRET` | A long random string (Render can auto-generate) |
   | `CORS_ORIGIN` | Your Vercel frontend URL, e.g. `https://supaweb.vercel.app` |
   | `NODE_ENV` | `production` |
   | `PORT` | `8080` |

6. Click **Deploy**. The build command installs pnpm and builds the API bundle.
7. Note the service URL (e.g. `https://supaweb-api.onrender.com`) — you need it for Step 3.

### Verify

```bash
curl https://supaweb-api.onrender.com/api/healthz
# → {"status":"ok"}
```

---

## 3. Frontend — Vercel

### First deploy

1. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo.
2. Set the following in **Build & Output Settings**:

   | Setting | Value |
   |---|---|
   | **Root Directory** | `artifacts/supaweb` |
   | **Build Command** | `cd ../.. && npm install -g pnpm@10 && pnpm install --frozen-lockfile && pnpm --filter @workspace/supaweb run build:vercel` |
   | **Output Directory** | `dist` |
   | **Install Command** | _(leave blank — handled by build command)_ |

3. Add **Environment Variables**:

   | Variable | Value |
   |---|---|
   | `VITE_API_BASE_URL` | Your Render API URL, e.g. `https://supaweb-api.onrender.com` |

4. Click **Deploy**.

### Verify

Open your Vercel URL. The site should load and API calls should reach Render.

---

## 4. Admin User

After the database is seeded, log in at `/admin/login`:

- **Email:** `admin@supaweb.dev`
- **Password:** `admin123`

Change the password immediately via the admin dashboard or by updating the bcrypt hash in the database.

---

## Environment Variable Summary

### API Server (Render)

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Neon PostgreSQL connection string |
| `SESSION_SECRET` | ✅ | Long random string for session signing |
| `CORS_ORIGIN` | ✅ | Comma-separated list of allowed frontend origins |
| `NODE_ENV` | ✅ | Must be `production` |
| `PORT` | ✅ | Render sets this automatically (default 8080) |

### Frontend (Vercel)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | ✅ | Full URL of the Render API (no trailing slash) |

---

## Local Development (Replit)

No changes needed. Replit's built-in proxy routes `/api` to the API server automatically. Do **not** set `VITE_API_BASE_URL` in Replit — leave it unset and relative URLs work out of the box.

---

## Updating Production

- **Frontend**: Push to GitHub → Vercel auto-redeploys.
- **Backend**: Push to GitHub → Render auto-redeploys.
- **Schema changes**: Run `DATABASE_URL=<neon-url> pnpm --filter @workspace/db run push` before deploying the new backend.
- **OpenAPI changes**: Run `pnpm --filter @workspace/api-spec run codegen` then commit the regenerated files before deploying.
