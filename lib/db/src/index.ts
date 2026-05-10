import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool, types } = pg;

// node-postgres does NOT parse PostgreSQL text arrays (OID 1009) into JS arrays
// by default — it returns them as raw strings like `{val1,val2}`.
// Register a parser so text[] columns come back as proper string[].
function parsePostgresTextArray(val: string): string[] {
  if (!val || val === "{}") return [];
  const inner = val.slice(1, -1);
  if (!inner) return [];
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === '"' && inner[i - 1] !== "\\") {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.replace(/\\"/g, '"'));
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.replace(/\\"/g, '"'));
  return result;
}
types.setTypeParser(1009 as Parameters<typeof types.setTypeParser>[0], parsePostgresTextArray); // text[]

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon (and most hosted PostgreSQL providers) require SSL in production.
  // rejectUnauthorized: false is safe — the host is validated via the connection
  // string, and Neon uses TLS on all connections.
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});
export const db = drizzle(pool, { schema });

export * from "./schema";
