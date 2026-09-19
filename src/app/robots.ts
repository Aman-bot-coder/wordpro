import type { MetadataRoute } from "next";
import { getSettings, listPages } from "@/lib/seo/repository";

export const revalidate = 300;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const [settings, pages] = await Promise.all([getSettings(), listPages()]);
  const base = settings.baseUrl.replace(/\/$/, "");

  // Anything flagged noindex in the admin is also disallowed from crawling.
  const disallow = pages.filter((p) => !p.robotsIndex).map((p) => p.path);

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
        disallow: ["/admin", "/admin/", "/api/", ...disallow],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
