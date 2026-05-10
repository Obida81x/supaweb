# SupaWeb Agency

A premium web development agency website with public-facing pages, a portfolio, and a secure admin dashboard to manage content.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v4 + Framer Motion + Wouter (routing)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Session auth: express-session + connect-pg-simple

## Where things live

- `artifacts/supaweb/` — React + Vite frontend (preview path `/`)
- `artifacts/api-server/` — Express 5 API server (preview path `/api`)
- `lib/db/` — Drizzle ORM schema + pool (shared)
- `lib/api-spec/` — OpenAPI YAML spec (source of truth for all endpoints)
- `lib/api-client-react/src/generated/api.ts` — auto-generated React Query hooks
- `lib/api-zod/src/generated/` — auto-generated Zod schemas

## Architecture decisions

- Contract-first API: all endpoints defined in OpenAPI spec first, then codegen runs to produce hooks and Zod schemas
- Sessions stored in PostgreSQL via connect-pg-simple (`session` table)
- Admin auth uses session cookies (`req.session.adminId`); all `/api/admin/*` routes check this
- No Supabase — using Replit's built-in PostgreSQL via `DATABASE_URL`
- Dark cinematic theme: deep bg hsl(222 47% 4%), violet accent hsl(263 85% 65%)

## Product

**Public pages:** Home (hero, stats, services, projects, testimonials, CTA), Services (full grid with features), Portfolio (filterable project grid), About (mission, process, tech stack), Contact (form + FAQ)

**Admin dashboard** (at `/admin/login`, password: `admin@supaweb.dev` / `admin123`):
- Dashboard: overview stats + recent messages
- Projects: full CRUD with featured/published toggles
- Services: full CRUD with sort order and features
- Testimonials: full CRUD with star ratings
- Messages: view and delete contact form submissions

## User preferences

- Dark cinematic theme — keep it dark and premium
- Violet accent color throughout

## Deployment

See `DEPLOYMENT.md` for full step-by-step instructions. Summary:

- **Frontend → Vercel**: root dir `artifacts/supaweb`, build cmd `cd ../.. && npm install -g pnpm@10 && pnpm install --frozen-lockfile && pnpm --filter @workspace/supaweb run build:vercel`, output `dist`
- **Backend → Render**: `render.yaml` at repo root configures everything; set `DATABASE_URL`, `SESSION_SECRET`, `CORS_ORIGIN` env vars
- **Database → Neon**: standard PostgreSQL connection string in `DATABASE_URL`; run `pnpm --filter @workspace/db run push` against Neon before first deploy
- **Env vars**: see `artifacts/supaweb/.env.example` and `artifacts/api-server/.env.example`
- **VITE_API_BASE_URL**: set to your Render URL on Vercel; leave unset in Replit (proxy handles it)

## Gotchas

- The `session` table in PostgreSQL must exist before the API server starts (connect-pg-simple creates it if `createTableIfMissing: true`, but run the DB push first if it fails)
- Admin password hash was generated with bcryptjs and stored via executeSql — do not re-run naive seed scripts without regenerating the hash
- `pnpm --filter @workspace/api-spec run codegen` must be re-run after any changes to `lib/api-spec/openapi.yaml`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
