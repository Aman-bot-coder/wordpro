import type { Metadata } from "next";
import { getPage, getSettings } from "@/lib/seo/repository";

function joinUrl(base: string, path: string): string {
  const clean = path === "/" ? "" : `/${path.replace(/^\/|\/$/g, "")}`;
  return `${base.replace(/\/$/, "")}${clean}`;
}

/**
 * Builds a route's Metadata from the database (falling back to the compiled-in
 * defaults when a row or the database itself is unavailable).
 *
 * Usage in a page:
 *   export const generateMetadata = () => buildMetadata("/pricing");
 */
export async function buildMetadata(path: string): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPage(path), getSettings()]);

  if (!page) {
    return { title: settings.siteName, description: settings.defaultDescription };
  }

  const canonical = page.canonicalOverride ?? joinUrl(settings.baseUrl, page.path);
  const socialTitle = page.ogTitle ?? page.title;
  const socialDescription = page.ogDescription ?? page.description;

  // An explicit upload wins; otherwise the card is generated from the DB row.
  const images = [
    {
      url: page.ogImage ?? `${settings.baseUrl}/api/og?path=${encodeURIComponent(page.path)}`,
      width: 1200,
      height: 630,
      alt: socialTitle,
    },
  ];

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords.length > 0 ? page.keywords : undefined,
    alternates: { canonical },
    robots: {
      index: page.robotsIndex,
      follow: page.robotsFollow,
      googleBot: {
        index: page.robotsIndex,
        follow: page.robotsFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: canonical,
      siteName: settings.siteName,
      locale: "en_US",
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      site: settings.twitterHandle,
      creator: settings.twitterHandle,
      ...(images ? { images } : {}),
    },
    ...(settings.googleVerification || settings.bingVerification
      ? {
          verification: {
            ...(settings.googleVerification ? { google: settings.googleVerification } : {}),
            ...(settings.bingVerification ? { other: { "msvalidate.01": settings.bingVerification } } : {}),
          },
        }
      : {}),
  };
}
