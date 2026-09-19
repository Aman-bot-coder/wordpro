import { cache } from "react";
import { mutate, query } from "@/lib/db/pool";
import { seoEntries, redirects as seedRedirects, siteConfig, type ChangeFrequency, type SchemaType } from "@/lib/seo/config";

// ---------------------------------------------------------------------------
// Domain types
// ---------------------------------------------------------------------------

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  focusKeyword: string;
  keywords: string[];
  robotsIndex: boolean;
  robotsFollow: boolean;
  canonicalOverride: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  schemaTypes: SchemaType[];
  breadcrumb: { name: string; path: string }[];
  sitemapPriority: number;
  sitemapChangefreq: ChangeFrequency;
  sitemapInclude: boolean;
  updatedAt: string | null;
};

export type SeoRedirect = {
  id: number;
  fromPath: string;
  toPath: string;
  statusCode: number;
  enabled: boolean;
  hits: number;
};

export type SeoSettings = {
  siteName: string;
  baseUrl: string;
  defaultDescription: string;
  titleTemplate: string;
  twitterHandle: string;
  organizationEmail: string;
  socialProfiles: string[];
  googleVerification: string | null;
  bingVerification: string | null;
  robotsExtra: string;
};

type PageRow = {
  path: string;
  title: string;
  description: string;
  focus_keyword: string;
  keywords: string[];
  robots_index: boolean;
  robots_follow: boolean;
  canonical_override: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  schema_types: string[];
  breadcrumb: { name: string; path: string }[];
  sitemap_priority: string | number;
  sitemap_changefreq: string;
  sitemap_include: boolean;
  updated_at: Date | null;
};

function rowToPage(row: PageRow): SeoPage {
  return {
    path: row.path,
    title: row.title,
    description: row.description,
    focusKeyword: row.focus_keyword,
    keywords: row.keywords ?? [],
    robotsIndex: row.robots_index,
    robotsFollow: row.robots_follow,
    canonicalOverride: row.canonical_override,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    ogImage: row.og_image,
    schemaTypes: (row.schema_types ?? []) as SchemaType[],
    breadcrumb: row.breadcrumb ?? [],
    sitemapPriority: Number(row.sitemap_priority),
    sitemapChangefreq: row.sitemap_changefreq as ChangeFrequency,
    sitemapInclude: row.sitemap_include,
    updatedAt: row.updated_at ? row.updated_at.toISOString() : null,
  };
}

/** Compiled-in defaults, used whenever the database has no row or is down. */
export function seedPage(path: string): SeoPage | null {
  const entry = seoEntries.find((e) => e.path === path);
  if (!entry) return null;
  return {
    path: entry.path,
    title: entry.title,
    description: entry.description,
    focusKeyword: entry.focusKeyword,
    keywords: entry.keywords,
    robotsIndex: entry.robots?.index ?? true,
    robotsFollow: entry.robots?.follow ?? true,
    canonicalOverride: null,
    ogTitle: entry.ogTitle ?? null,
    ogDescription: null,
    ogImage: null,
    schemaTypes: entry.schema ?? [],
    breadcrumb: entry.breadcrumb ?? [],
    sitemapPriority: entry.sitemap?.priority ?? 0.5,
    sitemapChangefreq: entry.sitemap?.changeFrequency ?? "monthly",
    sitemapInclude: true,
    updatedAt: null,
  };
}

export function seedPages(): SeoPage[] {
  return seoEntries.map((e) => seedPage(e.path)!).filter(Boolean);
}

// ---------------------------------------------------------------------------
// Reads — cached per request, and never throw.
// ---------------------------------------------------------------------------

export const getPage = cache(async (path: string): Promise<SeoPage | null> => {
  const rows = await query<PageRow>("SELECT * FROM seo_pages WHERE path = $1 LIMIT 1", [path]);
  if (rows && rows.length > 0) return rowToPage(rows[0]);
  return seedPage(path);
});

export const listPages = cache(async (): Promise<SeoPage[]> => {
  const rows = await query<PageRow>("SELECT * FROM seo_pages ORDER BY path ASC");
  if (rows && rows.length > 0) return rows.map(rowToPage);
  return seedPages();
});

export const listRedirects = cache(async (): Promise<SeoRedirect[]> => {
  const rows = await query<{
    id: number;
    from_path: string;
    to_path: string;
    status_code: number;
    enabled: boolean;
    hits: number;
  }>("SELECT * FROM seo_redirects ORDER BY from_path ASC");

  if (rows) {
    return rows.map((r) => ({
      id: r.id,
      fromPath: r.from_path,
      toPath: r.to_path,
      statusCode: r.status_code,
      enabled: r.enabled,
      hits: r.hits,
    }));
  }

  return seedRedirects.map((r, i) => ({
    id: -(i + 1),
    fromPath: r.from,
    toPath: r.to,
    statusCode: 301,
    enabled: true,
    hits: 0,
  }));
});

export const findRedirect = cache(async (fromPath: string): Promise<SeoRedirect | null> => {
  const all = await listRedirects();
  return all.find((r) => r.enabled && r.fromPath === fromPath) ?? null;
});

export const getSettings = cache(async (): Promise<SeoSettings> => {
  const fallback: SeoSettings = {
    siteName: siteConfig.name,
    baseUrl: siteConfig.baseUrl,
    defaultDescription: siteConfig.defaultDescription,
    titleTemplate: siteConfig.titleTemplate,
    twitterHandle: siteConfig.twitterHandle,
    organizationEmail: siteConfig.email,
    socialProfiles: [siteConfig.linkedin, siteConfig.twitter],
    googleVerification: null,
    bingVerification: null,
    robotsExtra: "",
  };

  const rows = await query<{
    site_name: string;
    base_url: string;
    default_description: string;
    title_template: string;
    twitter_handle: string;
    organization_email: string;
    social_profiles: string[];
    google_verification: string | null;
    bing_verification: string | null;
    robots_extra: string;
  }>("SELECT * FROM seo_settings WHERE id = 1");

  if (!rows || rows.length === 0) return fallback;
  const r = rows[0];
  return {
    siteName: r.site_name,
    baseUrl: r.base_url,
    defaultDescription: r.default_description || fallback.defaultDescription,
    titleTemplate: r.title_template,
    twitterHandle: r.twitter_handle,
    organizationEmail: r.organization_email,
    socialProfiles: r.social_profiles ?? [],
    googleVerification: r.google_verification,
    bingVerification: r.bing_verification,
    robotsExtra: r.robots_extra ?? "",
  };
});

// ---------------------------------------------------------------------------
// Writes — used by the admin panel. These throw on failure, by design.
// ---------------------------------------------------------------------------

export async function upsertPage(page: SeoPage): Promise<void> {
  await mutate(
    `INSERT INTO seo_pages (
       path, title, description, focus_keyword, keywords,
       robots_index, robots_follow, canonical_override,
       og_title, og_description, og_image,
       schema_types, breadcrumb,
       sitemap_priority, sitemap_changefreq, sitemap_include, updated_at
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14,$15,$16,NOW())
     ON CONFLICT (path) DO UPDATE SET
       title = EXCLUDED.title,
       description = EXCLUDED.description,
       focus_keyword = EXCLUDED.focus_keyword,
       keywords = EXCLUDED.keywords,
       robots_index = EXCLUDED.robots_index,
       robots_follow = EXCLUDED.robots_follow,
       canonical_override = EXCLUDED.canonical_override,
       og_title = EXCLUDED.og_title,
       og_description = EXCLUDED.og_description,
       og_image = EXCLUDED.og_image,
       schema_types = EXCLUDED.schema_types,
       breadcrumb = EXCLUDED.breadcrumb,
       sitemap_priority = EXCLUDED.sitemap_priority,
       sitemap_changefreq = EXCLUDED.sitemap_changefreq,
       sitemap_include = EXCLUDED.sitemap_include,
       updated_at = NOW()`,
    [
      page.path,
      page.title,
      page.description,
      page.focusKeyword,
      page.keywords,
      page.robotsIndex,
      page.robotsFollow,
      page.canonicalOverride,
      page.ogTitle,
      page.ogDescription,
      page.ogImage,
      page.schemaTypes,
      JSON.stringify(page.breadcrumb),
      page.sitemapPriority,
      page.sitemapChangefreq,
      page.sitemapInclude,
    ]
  );
}

export async function saveRedirect(input: {
  id?: number;
  fromPath: string;
  toPath: string;
  statusCode: number;
  enabled: boolean;
}): Promise<void> {
  await mutate(
    `INSERT INTO seo_redirects (from_path, to_path, status_code, enabled)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (from_path) DO UPDATE SET
       to_path = EXCLUDED.to_path,
       status_code = EXCLUDED.status_code,
       enabled = EXCLUDED.enabled`,
    [input.fromPath, input.toPath, input.statusCode, input.enabled]
  );
}

export async function deleteRedirect(id: number): Promise<void> {
  await mutate("DELETE FROM seo_redirects WHERE id = $1", [id]);
}

export async function updateSettings(settings: SeoSettings): Promise<void> {
  await mutate(
    `INSERT INTO seo_settings (
       id, site_name, base_url, default_description, title_template,
       twitter_handle, organization_email, social_profiles,
       google_verification, bing_verification, robots_extra, updated_at
     ) VALUES (1,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW())
     ON CONFLICT (id) DO UPDATE SET
       site_name = EXCLUDED.site_name,
       base_url = EXCLUDED.base_url,
       default_description = EXCLUDED.default_description,
       title_template = EXCLUDED.title_template,
       twitter_handle = EXCLUDED.twitter_handle,
       organization_email = EXCLUDED.organization_email,
       social_profiles = EXCLUDED.social_profiles,
       google_verification = EXCLUDED.google_verification,
       bing_verification = EXCLUDED.bing_verification,
       robots_extra = EXCLUDED.robots_extra,
       updated_at = NOW()`,
    [
      settings.siteName,
      settings.baseUrl,
      settings.defaultDescription,
      settings.titleTemplate,
      settings.twitterHandle,
      settings.organizationEmail,
      settings.socialProfiles,
      settings.googleVerification,
      settings.bingVerification,
      settings.robotsExtra,
    ]
  );
}

export async function recordAudit(path: string, score: number, issues: unknown): Promise<void> {
  await mutate("INSERT INTO seo_audits (path, score, issues) VALUES ($1,$2,$3::jsonb)", [
    path,
    score,
    JSON.stringify(issues),
  ]);
}
