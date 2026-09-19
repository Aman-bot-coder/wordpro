import { cache } from "react";
import type { RowDataPacket } from "mysql2";
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

type PageRow = RowDataPacket & {
  path: string;
  title: string;
  description: string;
  focus_keyword: string;
  keywords: unknown;
  robots_index: number;
  robots_follow: number;
  canonical_override: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  schema_types: unknown;
  breadcrumb: unknown;
  sitemap_priority: string | number;
  sitemap_changefreq: string;
  sitemap_include: number;
  updated_at: Date | string | null;
};

// MySQL JSON columns come back parsed by mysql2, but be defensive: accept a
// JSON string too, and always fall back to a sane default.
function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function asDateString(value: Date | string | null): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function rowToPage(row: PageRow): SeoPage {
  return {
    path: row.path,
    title: row.title,
    description: row.description,
    focusKeyword: row.focus_keyword,
    keywords: asArray<string>(row.keywords),
    robotsIndex: Boolean(row.robots_index),
    robotsFollow: Boolean(row.robots_follow),
    canonicalOverride: row.canonical_override,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    ogImage: row.og_image,
    schemaTypes: asArray<SchemaType>(row.schema_types),
    breadcrumb: asArray<{ name: string; path: string }>(row.breadcrumb),
    sitemapPriority: Number(row.sitemap_priority),
    sitemapChangefreq: row.sitemap_changefreq as ChangeFrequency,
    sitemapInclude: Boolean(row.sitemap_include),
    updatedAt: asDateString(row.updated_at),
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
  const rows = await query<PageRow>("SELECT * FROM seo_pages WHERE path = ? LIMIT 1", [path]);
  if (rows && rows.length > 0) return rowToPage(rows[0]);
  return seedPage(path);
});

export const listPages = cache(async (): Promise<SeoPage[]> => {
  const rows = await query<PageRow>("SELECT * FROM seo_pages ORDER BY path ASC");
  if (rows && rows.length > 0) return rows.map(rowToPage);
  return seedPages();
});

type RedirectRow = RowDataPacket & {
  id: number;
  from_path: string;
  to_path: string;
  status_code: number;
  enabled: number;
  hits: number;
};

export const listRedirects = cache(async (): Promise<SeoRedirect[]> => {
  const rows = await query<RedirectRow>("SELECT * FROM seo_redirects ORDER BY from_path ASC");

  if (rows) {
    return rows.map((r) => ({
      id: r.id,
      fromPath: r.from_path,
      toPath: r.to_path,
      statusCode: r.status_code,
      enabled: Boolean(r.enabled),
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

type SettingsRow = RowDataPacket & {
  site_name: string;
  base_url: string;
  default_description: string;
  title_template: string;
  twitter_handle: string;
  organization_email: string;
  social_profiles: unknown;
  google_verification: string | null;
  bing_verification: string | null;
  robots_extra: string;
};

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

  const rows = await query<SettingsRow>("SELECT * FROM seo_settings WHERE id = 1");
  if (!rows || rows.length === 0) return fallback;

  const r = rows[0];
  return {
    siteName: r.site_name,
    baseUrl: r.base_url,
    defaultDescription: r.default_description || fallback.defaultDescription,
    titleTemplate: r.title_template,
    twitterHandle: r.twitter_handle,
    organizationEmail: r.organization_email,
    socialProfiles: asArray<string>(r.social_profiles),
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
       sitemap_priority, sitemap_changefreq, sitemap_include
     ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       description = VALUES(description),
       focus_keyword = VALUES(focus_keyword),
       keywords = VALUES(keywords),
       robots_index = VALUES(robots_index),
       robots_follow = VALUES(robots_follow),
       canonical_override = VALUES(canonical_override),
       og_title = VALUES(og_title),
       og_description = VALUES(og_description),
       og_image = VALUES(og_image),
       schema_types = VALUES(schema_types),
       breadcrumb = VALUES(breadcrumb),
       sitemap_priority = VALUES(sitemap_priority),
       sitemap_changefreq = VALUES(sitemap_changefreq),
       sitemap_include = VALUES(sitemap_include)`,
    [
      page.path,
      page.title,
      page.description,
      page.focusKeyword,
      JSON.stringify(page.keywords),
      page.robotsIndex ? 1 : 0,
      page.robotsFollow ? 1 : 0,
      page.canonicalOverride,
      page.ogTitle,
      page.ogDescription,
      page.ogImage,
      JSON.stringify(page.schemaTypes),
      JSON.stringify(page.breadcrumb),
      page.sitemapPriority,
      page.sitemapChangefreq,
      page.sitemapInclude ? 1 : 0,
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
     VALUES (?,?,?,?)
     ON DUPLICATE KEY UPDATE
       to_path = VALUES(to_path),
       status_code = VALUES(status_code),
       enabled = VALUES(enabled)`,
    [input.fromPath, input.toPath, input.statusCode, input.enabled ? 1 : 0]
  );
}

export async function deleteRedirect(id: number): Promise<void> {
  await mutate("DELETE FROM seo_redirects WHERE id = ?", [id]);
}

export async function updateSettings(settings: SeoSettings): Promise<void> {
  await mutate(
    `INSERT INTO seo_settings (
       id, site_name, base_url, default_description, title_template,
       twitter_handle, organization_email, social_profiles,
       google_verification, bing_verification, robots_extra
     ) VALUES (1,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE
       site_name = VALUES(site_name),
       base_url = VALUES(base_url),
       default_description = VALUES(default_description),
       title_template = VALUES(title_template),
       twitter_handle = VALUES(twitter_handle),
       organization_email = VALUES(organization_email),
       social_profiles = VALUES(social_profiles),
       google_verification = VALUES(google_verification),
       bing_verification = VALUES(bing_verification),
       robots_extra = VALUES(robots_extra)`,
    [
      settings.siteName,
      settings.baseUrl,
      settings.defaultDescription,
      settings.titleTemplate,
      settings.twitterHandle,
      settings.organizationEmail,
      JSON.stringify(settings.socialProfiles),
      settings.googleVerification,
      settings.bingVerification,
      settings.robotsExtra,
    ]
  );
}

export async function recordAudit(path: string, score: number, issues: unknown): Promise<void> {
  await mutate("INSERT INTO seo_audits (path, score, issues) VALUES (?,?,?)", [
    path,
    score,
    JSON.stringify(issues),
  ]);
}
