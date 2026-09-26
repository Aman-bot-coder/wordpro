import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Single source of truth for all SEO on the site.
// Every page's meta tags, keywords, schema, sitemap entry and robots directive
// is derived from this file. Edit here, not in individual page files.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "WRDS.PRO",
  legalName: "WRDS.PRO",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wrds.pro",
  locale: "en_US",
  twitterHandle: "@Wrdspro",
  linkedin: "https://linkedin.com/company/wrdspro/",
  twitter: "https://x.com/Wrdspro",
  email: "hello@wrds.pro",
  titleTemplate: "%s — WRDS.PRO",
  defaultDescription:
    "wrds.pro builds narrative infrastructure that makes founders discoverable, credible and memorable across LinkedIn, Google and AI — human-written, always.",
} as const;

export type SchemaType =
  | "WebSite"
  | "Organization"
  | "Service"
  | "Article"
  | "FAQPage"
  | "CollectionPage"
  | "AboutPage"
  | "ContactPage";

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type SeoEntry = {
  /** Route path, always with a leading slash and no trailing slash (except "/"). */
  path: string;
  /** Used verbatim in <title>. Aim for 30–60 characters. */
  title: string;
  /** Used in <meta name="description">. Aim for 120–160 characters. */
  description: string;
  /** The one phrase this page is trying to rank for. Drives audit scoring. */
  focusKeyword: string;
  /** Supporting keywords. Rendered into <meta name="keywords">. */
  keywords: string[];
  /** Defaults to index+follow when omitted. */
  robots?: { index?: boolean; follow?: boolean };
  /** Structured data emitted on this page, in addition to the site-wide graph. */
  schema?: SchemaType[];
  /** Sitemap tuning. */
  sitemap?: { priority: number; changeFrequency: ChangeFrequency };
  /** Breadcrumb trail, excluding Home (added automatically). */
  breadcrumb?: { name: string; path: string }[];
  /** Overrides the social-card headline. Falls back to `title`. */
  ogTitle?: string;
};

export const seoEntries: SeoEntry[] = [
  {
    path: "/",
    title: "Narrative Infrastructure for Founders",
    description:
      "Your investors Google you before every meeting. wrds.pro builds narrative infrastructure that makes founders discoverable, credible and memorable.",
    focusKeyword: "narrative infrastructure",
    keywords: [
      "narrative infrastructure",
      "founder thought leadership",
      "executive authority",
      "LinkedIn ghostwriting for founders",
      "founder visibility",
      "B2B thought leadership agency",
    ],
    schema: ["WebSite", "Service"],
    sitemap: { priority: 1.0, changeFrequency: "weekly" },
    ogTitle: "Your investors Google you before every meeting.",
  },
  {
    path: "/the-work",
    title: "The Work — Services",
    description:
      "Eight disciplines that build executive authority: LinkedIn authority, SEO and GEO visibility, founder IP extraction, positioning and content strategy.",
    focusKeyword: "executive authority services",
    keywords: [
      "executive authority services",
      "founder IP extraction",
      "LinkedIn authority",
      "executive positioning",
      "thought leadership services",
      "competitive intelligence",
    ],
    schema: ["Service", "CollectionPage"],
    sitemap: { priority: 0.9, changeFrequency: "monthly" },
    breadcrumb: [{ name: "The Work", path: "/the-work" }],
  },
  {
    path: "/the-system",
    title: "The System — Executive Authority Stack",
    description:
      "Signal Audit, IP Engine and Intellectual Asset Class — the three layers that lock together into compounding narrative infrastructure for founders.",
    focusKeyword: "executive authority stack",
    keywords: [
      "executive authority stack",
      "signal audit",
      "IP engine",
      "intellectual asset class",
      "founder authority system",
      "narrative infrastructure process",
    ],
    schema: ["Service"],
    sitemap: { priority: 0.9, changeFrequency: "monthly" },
    breadcrumb: [{ name: "The System", path: "/the-system" }],
  },
  {
    path: "/case-studies",
    title: "Case Studies",
    description:
      "Ninety-day narrative infrastructure engagements and their outcomes across Industrial IoT, family office and AI product leadership founders.",
    focusKeyword: "founder authority case studies",
    keywords: [
      "founder authority case studies",
      "LinkedIn growth case study",
      "thought leadership results",
      "B2B founder marketing results",
      "executive branding case study",
    ],
    schema: ["CollectionPage"],
    sitemap: { priority: 0.8, changeFrequency: "monthly" },
    breadcrumb: [{ name: "Case Studies", path: "/case-studies" }],
  },
  {
    path: "/pricing",
    title: "Pricing",
    description:
      "Foundation at $899/month, Authority at $1,999/month and a custom Partner plan. Eight founders accepted per quarter, by design.",
    focusKeyword: "founder ghostwriting pricing",
    keywords: [
      "founder ghostwriting pricing",
      "LinkedIn ghostwriting cost",
      "thought leadership pricing",
      "executive content retainer",
      "B2B content pricing",
    ],
    schema: ["Service"],
    sitemap: { priority: 0.9, changeFrequency: "monthly" },
    breadcrumb: [{ name: "Pricing", path: "/pricing" }],
  },
  {
    path: "/seo-geo",
    title: "SEO + GEO",
    description:
      "SEO makes you discoverable on Google. GEO makes you retrievable and citable by AI models. Every wrds.pro plan is built for both search layers.",
    focusKeyword: "generative engine optimization",
    keywords: [
      "generative engine optimization",
      "GEO",
      "AI search visibility",
      "SEO for founders",
      "AI citation optimization",
      "LLM visibility",
    ],
    schema: ["Service"],
    sitemap: { priority: 0.9, changeFrequency: "monthly" },
    breadcrumb: [{ name: "SEO + GEO", path: "/seo-geo" }],
  },
  {
    path: "/insights",
    title: "Insights",
    description:
      "Long-form thinking on SEO, GEO, founder authority and the mechanics of becoming discoverable to investors, buyers and senior talent.",
    focusKeyword: "founder authority insights",
    keywords: [
      "founder authority insights",
      "thought leadership blog",
      "GEO insights",
      "executive branding articles",
      "AI discovery",
    ],
    schema: ["CollectionPage"],
    sitemap: { priority: 0.6, changeFrequency: "weekly" },
    breadcrumb: [{ name: "Insights", path: "/insights" }],
  },
  {
    path: "/about",
    title: "About",
    description:
      "A strategy firm that happens to produce exceptional content. Human-written IP extracted from founders, capped at eight engagements per quarter.",
    focusKeyword: "founder content strategy firm",
    keywords: [
      "founder content strategy firm",
      "human written content agency",
      "executive authority agency",
      "thought leadership consultancy",
    ],
    schema: ["AboutPage"],
    sitemap: { priority: 0.7, changeFrequency: "yearly" },
    breadcrumb: [{ name: "About", path: "/about" }],
  },
  {
    path: "/faq",
    title: "FAQ",
    description:
      "Answers on ghostwriting transparency, the human-writing guarantee, what GEO means, time commitment, timelines and the difference between plans.",
    focusKeyword: "founder ghostwriting faq",
    keywords: [
      "founder ghostwriting faq",
      "what is narrative infrastructure",
      "what is GEO",
      "human written guarantee",
      "ghostwriting questions",
    ],
    schema: ["FAQPage"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    breadcrumb: [{ name: "FAQ", path: "/faq" }],
  },
  {
    path: "/contact",
    title: "Contact Wrds.Pro to Strengthen Founder Authority and Digital Visibility",
    description:
      "Book a 30-minute Authority Audit with Wrds.Pro to assess your LinkedIn authority and AI discoverability.",
    focusKeyword: "authority audit",
    keywords: [
      "authority audit",
      "book founder content audit",
      "executive visibility audit",
      "contact wrds.pro",
    ],
    schema: ["ContactPage"],
    sitemap: { priority: 0.8, changeFrequency: "yearly" },
    breadcrumb: [{ name: "Contact", path: "/contact" }],
  },
];

// ---------------------------------------------------------------------------
// Redirects. Static export cannot do server redirects, so these are emitted as
// meta-refresh + canonical HTML pages by scripts/generate-redirects.ts.
// ---------------------------------------------------------------------------

export const redirects: { from: string; to: string }[] = [
  { from: "/services", to: "/the-work" },
  { from: "/blog", to: "/insights" },
  { from: "/book", to: "/contact" },
  { from: "/geo", to: "/seo-geo" },
];

// ---------------------------------------------------------------------------
// Lookup + metadata builder
// ---------------------------------------------------------------------------

export function getSeoEntry(path: string): SeoEntry | undefined {
  return seoEntries.find((entry) => entry.path === path);
}

export function absoluteUrl(path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${siteConfig.baseUrl}${clean}`;
}

/**
 * Builds the complete Next.js Metadata object for a route from its SEO entry.
 * Open Graph images are intentionally not set here — the opengraph-image file
 * convention generates them per route and Next merges them automatically.
 */
export function buildMetadata(path: string): Metadata {
  const entry = getSeoEntry(path);
  if (!entry) {
    throw new Error(
      `[seo] No SEO entry defined for "${path}". Add one to seoEntries in src/lib/seo.ts.`
    );
  }

  const index = entry.robots?.index ?? true;
  const follow = entry.robots?.follow ?? true;
  const url = absoluteUrl(entry.path);
  const socialTitle = entry.ogTitle ?? entry.title;

  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: url },
    robots: {
      index,
      follow,
      googleBot: { index, follow, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      title: socialTitle,
      description: entry.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: entry.description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },
  };
}
