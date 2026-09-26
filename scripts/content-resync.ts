/**
 * Force-updates blog_posts + case_study_posts bodies (and all fields) from the
 * compiled-in content (src/lib/insights.ts, src/lib/caseStudies.ts).
 * Unlike content:setup (which no-ops on existing rows), this overwrites them.
 * Use it after editing the compiled case-study / insight content.
 *
 *   DATABASE_URL=mysql://... npm run content:resync
 */
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
  const conn = await mysql.createConnection({ uri });

  let i = 0;
  for (const a of insights) {
    await conn.query(
      `INSERT INTO blog_posts (slug, title, category, meta_title, meta_description, excerpt, body, published, sort_order)
       VALUES (?,?,?,?,?,?,?,1,?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title), category = VALUES(category), meta_title = VALUES(meta_title),
         meta_description = VALUES(meta_description), excerpt = VALUES(excerpt), body = VALUES(body)`,
      [a.slug, a.title, a.category, a.metaTitle, a.metaDescription, a.excerpt, a.body, i++],
    );
  }
  console.log(`✓ resynced ${insights.length} blog posts`);

  i = 0;
  for (const c of caseStudies) {
    await conn.query(
      `INSERT INTO case_study_posts (slug, client, industry, geo, title, summary, challenge, outcome, metrics, body, published, sort_order)
       VALUES (?,?,?,?,?,?,?,?,?,?,1,?)
       ON DUPLICATE KEY UPDATE
         client = VALUES(client), industry = VALUES(industry), geo = VALUES(geo), title = VALUES(title),
         summary = VALUES(summary), challenge = VALUES(challenge), outcome = VALUES(outcome),
         metrics = VALUES(metrics), body = VALUES(body)`,
      [c.slug, c.client, c.industry, c.geo, c.title, c.summary, c.challenge, c.outcome, JSON.stringify(c.metrics), c.body, i++],
    );
  }
  console.log(`✓ resynced ${caseStudies.length} case studies`);

  await conn.end();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
