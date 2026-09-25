/**
 * Creates blog_posts + case_study_posts tables and seeds them from the
 * compiled-in content (src/lib/insights.ts, src/lib/caseStudies.ts).
 * Safe to re-run: tables use IF NOT EXISTS, rows use INSERT ... ON DUPLICATE.
 *
 *   DATABASE_URL=mysql://... npm run content:setup
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { loadEnvConfig } from "@next/env";
import mysql from "mysql2/promise";
import { insights } from "../src/lib/insights";
import { caseStudies } from "../src/lib/caseStudies";

loadEnvConfig(process.cwd());

async function main() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }
  const conn = await mysql.createConnection({ uri, multipleStatements: true });

  const sql = readFileSync(join(process.cwd(), "src/lib/db/content-schema.sql"), "utf8");
  await conn.query(sql);
  console.log("✓ content schema applied");

  let i = 0;
  for (const a of insights) {
    await conn.query(
      `INSERT INTO blog_posts (slug, title, category, meta_title, meta_description, excerpt, body, published, sort_order)
       VALUES (?,?,?,?,?,?,?,1,?)
       ON DUPLICATE KEY UPDATE id = id`,
      [a.slug, a.title, a.category, a.metaTitle, a.metaDescription, a.excerpt, a.body, i++],
    );
  }
  console.log(`✓ seeded ${insights.length} blog posts`);

  i = 0;
  for (const c of caseStudies) {
    await conn.query(
      `INSERT INTO case_study_posts (slug, client, industry, geo, title, summary, challenge, outcome, metrics, body, published, sort_order)
       VALUES (?,?,?,?,?,?,?,?,?,?,1,?)
       ON DUPLICATE KEY UPDATE id = id`,
      [c.slug, c.client, c.industry, c.geo, c.title, c.summary, c.challenge, c.outcome, JSON.stringify(c.metrics), c.body, i++],
    );
  }
  console.log(`✓ seeded ${caseStudies.length} case studies`);

  await conn.end();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
