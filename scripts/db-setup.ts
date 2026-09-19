/**
 * Creates the SEO tables and seeds them from src/lib/seo/config.ts.
 * Safe to re-run: schema uses IF NOT EXISTS and seeding skips existing rows.
 *
 *   DATABASE_URL=postgres://... npm run db:setup
 *   DATABASE_URL=postgres://... npm run db:setup -- --force   (overwrite rows)
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { loadEnvConfig } from "@next/env";
import { Pool } from "pg";
import { seoEntries, redirects, siteConfig } from "../src/lib/seo/config";

loadEnvConfig(process.cwd());

const force = process.argv.includes("--force");

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const pool = new Pool({ connectionString });

  const sql = readFileSync(join(process.cwd(), "src/lib/db/schema.sql"), "utf8");
  await pool.query(sql);
  console.log("✓ schema applied");

  for (const entry of seoEntries) {
    const conflict = force
      ? `DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description,
           focus_keyword = EXCLUDED.focus_keyword,
           keywords = EXCLUDED.keywords,
           schema_types = EXCLUDED.schema_types,
           breadcrumb = EXCLUDED.breadcrumb,
           sitemap_priority = EXCLUDED.sitemap_priority,
           sitemap_changefreq = EXCLUDED.sitemap_changefreq,
           updated_at = NOW()`
      : "DO NOTHING";

    await pool.query(
      `INSERT INTO seo_pages (
         path, title, description, focus_keyword, keywords,
         robots_index, robots_follow, og_title,
         schema_types, breadcrumb, sitemap_priority, sitemap_changefreq
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11,$12)
       ON CONFLICT (path) ${conflict}`,
      [
        entry.path,
        entry.title,
        entry.description,
        entry.focusKeyword,
        entry.keywords,
        entry.robots?.index ?? true,
        entry.robots?.follow ?? true,
        entry.ogTitle ?? null,
        entry.schema ?? [],
        JSON.stringify(entry.breadcrumb ?? []),
        entry.sitemap?.priority ?? 0.5,
        entry.sitemap?.changeFrequency ?? "monthly",
      ]
    );
  }
  console.log(`✓ seeded ${seoEntries.length} pages`);

  for (const r of redirects) {
    await pool.query(
      `INSERT INTO seo_redirects (from_path, to_path, status_code)
       VALUES ($1,$2,301) ON CONFLICT (from_path) DO NOTHING`,
      [r.from, r.to]
    );
  }
  console.log(`✓ seeded ${redirects.length} redirects`);

  await pool.query(
    `INSERT INTO seo_settings (
       id, site_name, base_url, default_description, title_template,
       twitter_handle, organization_email, social_profiles
     ) VALUES (1,$1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (id) DO NOTHING`,
    [
      siteConfig.name,
      siteConfig.baseUrl,
      siteConfig.defaultDescription,
      siteConfig.titleTemplate,
      siteConfig.twitterHandle,
      siteConfig.email,
      [siteConfig.linkedin, siteConfig.twitter],
    ]
  );
  console.log("✓ settings initialised");

  await pool.end();
  console.log("\nDone. Start the app with DATABASE_URL set.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
