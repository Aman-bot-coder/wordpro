import { Pool, type QueryResultRow } from "pg";

// A single shared pool. In dev, Next.js hot-reloads modules, so the pool is
// stashed on globalThis to avoid exhausting connections on every reload.
const globalForDb = globalThis as unknown as { __seoPool?: Pool };

export function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;

  if (!globalForDb.__seoPool) {
    globalForDb.__seoPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      ...(process.env.DATABASE_SSL === "true"
        ? { ssl: { rejectUnauthorized: false } }
        : {}),
    });
    globalForDb.__seoPool.on("error", (err) => {
      console.error("[seo-db] idle client error:", err.message);
    });
  }

  return globalForDb.__seoPool;
}

/**
 * Runs a query and returns rows. Returns null (never throws) when the database
 * is unreachable or unconfigured, so the public site always falls back to the
 * compiled-in defaults rather than erroring.
 */
export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[] | null> {
  const pool = getPool();
  if (!pool) return null;

  try {
    const result = await pool.query<T>(text, params);
    return result.rows;
  } catch (error) {
    console.error("[seo-db] query failed:", (error as Error).message);
    return null;
  }
}

/** Same as `query`, but surfaces the error — used by admin writes. */
export async function mutate<T extends QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL is not configured.");
  const result = await pool.query<T>(text, params);
  return result.rows;
}

export async function isDatabaseReachable(): Promise<boolean> {
  const rows = await query("SELECT 1 AS ok");
  return rows !== null;
}
