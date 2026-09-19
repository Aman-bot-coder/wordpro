/**
 * Creates the SEO tables (MySQL) and seeds them from src/lib/seo/config.ts.
 * Safe to re-run: schema uses IF NOT EXISTS and seeding skips existing rows.
 *
 *   DATABASE_URL=mysql://... npm run db:setup
 *   DATABASE_URL=mysql://... npm run db:setup -- --force   (overwrite rows)
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { loadEnvConfig } from "@next/env";
import mysql from "mysql2/promise";
import { seoEntries, redirects, siteConfig } from "../src/lib/seo/config";

loadEnvConfig(process.cwd());

const force = process.argv.includes("--force");

async function main() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const conn = await mysql.createConnection({ uri, multipleStatements: true });

  const sql = readFileSync(join(process.cwd(), "src/lib/db/schema.sql"), "utf8");
  await conn.query(sql);
  console.log("✓ schema applied");

  for (const entry of seoEntries) {
    const onDup = force
      ? `ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           description = VALUES(description),
           focus_keyword = VALUES(focus_keyword),
           keywords = VALUES(keywords),
           schema_types = VALUES(schema_types),
           breadcrumb = VALUES(breadcrumb),
           sitemap_priority = VALUES(sitemap_priority),
           sitemap_changefreq = VALUES(sitemap_changefreq)`
      : `ON DUPLICATE KEY UPDATE id = id`; // no-op keeps existing row

    await conn.query(
      `INSERT INTO seo_pages (
         path, title, description, focus_keyword, keywords,
         robots_index, robots_follow, og_title,
         schema_types, breadcrumb, sitemap_priority, sitemap_changefreq, sitemap_include
       ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,1)
       ${onDup}`,
      [
        entry.path,
        entry.title,
        entry.description,
        entry.focusKeyword,
        JSON.stringify(entry.keywords),
        entry.robots?.index === false ? 0 : 1,
        entry.robots?.follow === false ? 0 : 1,
        entry.ogTitle ?? null,
        JSON.stringify(entry.schema ?? []),
        JSON.stringify(entry.breadcrumb ?? []),
        entry.sitemap?.priority ?? 0.5,
        entry.sitemap?.changeFrequency ?? "monthly",
      ]
    );
  }
  console.log(`✓ seeded ${seoEntries.length} pages`);

  for (const r of redirects) {
    await conn.query(
      `INSERT INTO seo_redirects (from_path, to_path, status_code)
       VALUES (?,?,301) ON DUPLICATE KEY UPDATE id = id`,
      [r.from, r.to]
    );
  }
  console.log(`✓ seeded ${redirects.length} redirects`);

  await conn.query(
    `INSERT INTO seo_settings (
       id, site_name, base_url, default_description, title_template,
       twitter_handle, organization_email, social_profiles, robots_extra
     ) VALUES (1,?,?,?,?,?,?,?,'')
     ON DUPLICATE KEY UPDATE id = id`,
    [
      siteConfig.name,
      siteConfig.baseUrl,
      siteConfig.defaultDescription,
      siteConfig.titleTemplate,
      siteConfig.twitterHandle,
      siteConfig.email,
      JSON.stringify([siteConfig.linkedin, siteConfig.twitter]),
    ]
  );
  console.log("✓ settings initialised");

  await conn.end();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
