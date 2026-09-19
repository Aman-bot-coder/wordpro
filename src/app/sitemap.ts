import type { MetadataRoute } from "next";
import { listPages, getSettings } from "@/lib/seo/repository";
import { caseStudies } from "@/lib/content";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, settings] = await Promise.all([listPages(), getSettings()]);
  const base = settings.baseUrl.replace(/\/$/, "");

  const entries: MetadataRoute.Sitemap = pages
    .filter((page) => page.sitemapInclude && page.robotsIndex)
    .map((page) => ({
      url: page.path === "/" ? base : `${base}${page.path}`,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
      changeFrequency: page.sitemapChangefreq,
      priority: page.sitemapPriority,
    }));

  // Case study detail pages are content-driven rather than SEO-row driven.
  for (const cs of caseStudies) {
    entries.push({
      url: `${base}/case-studies/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
