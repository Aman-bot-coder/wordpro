import { cache } from "react";
import type { RowDataPacket } from "mysql2";
import { mutate, query } from "@/lib/db/pool";
import { insights as seedInsights, type Insight } from "@/lib/insights";
import { caseStudies as seedCaseStudies, type CaseStudy } from "@/lib/caseStudies";

// ---------------------------------------------------------------------------
// Blogs (insights)
// ---------------------------------------------------------------------------

export type BlogPost = Insight & { coverImage: string | null; published: boolean };

type BlogRow = RowDataPacket & {
  slug: string;
  title: string;
  category: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  cover_image: string | null;
  body: string;
  published: number;
};

function rowToBlog(r: BlogRow): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    metaTitle: r.meta_title || r.title,
    metaDescription: r.meta_description || r.excerpt,
    excerpt: r.excerpt,
    coverImage: r.cover_image,
    body: r.body,
    published: Boolean(r.published),
  };
}

function seedBlogs(): BlogPost[] {
  return seedInsights.map((a) => ({ ...a, coverImage: null, published: true }));
}

export const listBlogs = cache(async (opts?: { includeDrafts?: boolean }): Promise<BlogPost[]> => {
  const rows = await query<BlogRow>("SELECT * FROM blog_posts ORDER BY sort_order ASC, created_at DESC");
  if (rows === null) return seedBlogs(); // DB unreachable → compiled fallback
  const all = rows.map(rowToBlog);
  return opts?.includeDrafts ? all : all.filter((b) => b.published);
});

export const getBlog = cache(async (slug: string): Promise<BlogPost | null> => {
  const rows = await query<BlogRow>("SELECT * FROM blog_posts WHERE slug = ? LIMIT 1", [slug]);
  if (rows === null) return seedBlogs().find((b) => b.slug === slug) ?? null;
  return rows.length ? rowToBlog(rows[0]) : null;
});

export async function upsertBlog(post: BlogPost & { originalSlug?: string }): Promise<void> {
  await mutate(
    `INSERT INTO blog_posts (slug, title, category, meta_title, meta_description, excerpt, cover_image, body, published)
     VALUES (?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE
       title = VALUES(title), category = VALUES(category), meta_title = VALUES(meta_title),
       meta_description = VALUES(meta_description), excerpt = VALUES(excerpt),
       cover_image = VALUES(cover_image), body = VALUES(body), published = VALUES(published)`,
    [
      post.slug,
      post.title,
      post.category,
      post.metaTitle,
      post.metaDescription,
      post.excerpt,
      post.coverImage,
      post.body,
      post.published ? 1 : 0,
    ]
  );
}

export async function deleteBlog(slug: string): Promise<void> {
  await mutate("DELETE FROM blog_posts WHERE slug = ?", [slug]);
}

// ---------------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------------

export type CaseStudyPost = CaseStudy & { coverImage: string | null; published: boolean };

type CaseRow = RowDataPacket & {
  slug: string;
  client: string;
  industry: string;
  geo: string;
  title: string;
  summary: string;
  challenge: string;
  outcome: string;
  metrics: unknown;
  cover_image: string | null;
  body: string;
  published: number;
};

function asMetrics(v: unknown): { value: string; label: string }[] {
  if (Array.isArray(v)) return v as { value: string; label: string }[];
  if (typeof v === "string") {
    try {
      const p = JSON.parse(v);
      return Array.isArray(p) ? p : [];
    } catch {
      return [];
    }
  }
  return [];
}

function rowToCase(r: CaseRow): CaseStudyPost {
  return {
    slug: r.slug,
    client: r.client,
    industry: r.industry,
    geo: r.geo,
    title: r.title,
    summary: r.summary,
    challenge: r.challenge,
    outcome: r.outcome,
    metrics: asMetrics(r.metrics),
    coverImage: r.cover_image,
    body: r.body,
    published: Boolean(r.published),
  };
}

function seedCases(): CaseStudyPost[] {
  return seedCaseStudies.map((c) => ({ ...c, coverImage: null, published: true }));
}

export const listCaseStudies = cache(async (opts?: { includeDrafts?: boolean }): Promise<CaseStudyPost[]> => {
  const rows = await query<CaseRow>("SELECT * FROM case_study_posts ORDER BY sort_order ASC, created_at DESC");
  if (rows === null) return seedCases();
  const all = rows.map(rowToCase);
  return opts?.includeDrafts ? all : all.filter((c) => c.published);
});

export const getCaseStudy = cache(async (slug: string): Promise<CaseStudyPost | null> => {
  const rows = await query<CaseRow>("SELECT * FROM case_study_posts WHERE slug = ? LIMIT 1", [slug]);
  if (rows === null) return seedCases().find((c) => c.slug === slug) ?? null;
  return rows.length ? rowToCase(rows[0]) : null;
});

export async function upsertCaseStudy(post: CaseStudyPost): Promise<void> {
  await mutate(
    `INSERT INTO case_study_posts (slug, client, industry, geo, title, summary, challenge, outcome, metrics, cover_image, body, published)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE
       client = VALUES(client), industry = VALUES(industry), geo = VALUES(geo), title = VALUES(title),
       summary = VALUES(summary), challenge = VALUES(challenge), outcome = VALUES(outcome),
       metrics = VALUES(metrics), cover_image = VALUES(cover_image), body = VALUES(body), published = VALUES(published)`,
    [
      post.slug,
      post.client,
      post.industry,
      post.geo,
      post.title,
      post.summary,
      post.challenge,
      post.outcome,
      JSON.stringify(post.metrics),
      post.coverImage,
      post.body,
      post.published ? 1 : 0,
    ]
  );
}

export async function deleteCaseStudy(slug: string): Promise<void> {
  await mutate("DELETE FROM case_study_posts WHERE slug = ?", [slug]);
}
