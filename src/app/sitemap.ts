import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content";

export const dynamic = "force-static";

const routes = [
  "",
  "/the-work",
  "/the-system",
  "/case-studies",
  "/pricing",
  "/insights",
  "/about",
  "/seo-geo",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wrds.pro";
  const staticRoutes = routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
  }));
  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${base}/case-studies/${cs.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...caseStudyRoutes];
}
