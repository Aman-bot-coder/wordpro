import { absoluteUrl, siteConfig } from "@/lib/seo/config";
import { getPage } from "@/lib/seo/repository";
import { faqs, pricing, services } from "@/lib/content";

type JsonLd = Record<string, unknown>;

const ORG_ID = `${siteConfig.baseUrl}/#organization`;
const SITE_ID = `${siteConfig.baseUrl}/#website`;

type SettingsLike = {
  siteName: string;
  baseUrl: string;
  defaultDescription: string;
  organizationEmail: string;
  socialProfiles: string[];
};

export function organizationSchema(settings?: SettingsLike): JsonLd {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: settings?.siteName ?? siteConfig.name,
    legalName: settings?.siteName ?? siteConfig.legalName,
    url: settings?.baseUrl ?? siteConfig.baseUrl,
    email: settings?.organizationEmail ?? siteConfig.email,
    description: settings?.defaultDescription ?? siteConfig.defaultDescription,
    sameAs: settings?.socialProfiles ?? [siteConfig.linkedin, siteConfig.twitter],
    knowsAbout: [
      "Narrative infrastructure",
      "Executive authority",
      "Founder thought leadership",
      "Generative Engine Optimization",
      "Search engine optimization",
      "LinkedIn ghostwriting",
    ],
  };
}

export function websiteSchema(settings?: SettingsLike): JsonLd {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: settings?.baseUrl ?? siteConfig.baseUrl,
    name: settings?.siteName ?? siteConfig.name,
    description: settings?.defaultDescription ?? siteConfig.defaultDescription,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function serviceSchema(): JsonLd {
  return {
    "@type": "Service",
    "@id": `${siteConfig.baseUrl}/#service`,
    name: "Narrative Infrastructure for Founders",
    serviceType: "Executive authority and thought leadership strategy",
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    description:
      "Signal auditing, founder IP extraction and monthly content deployment across LinkedIn, Google and AI discovery layers.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engagement plans",
      itemListElement: pricing.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.audience,
        ...(plan.price.startsWith("$")
          ? {
              price: plan.price.replace(/[$,]/g, ""),
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: plan.price.replace(/[$,]/g, ""),
                priceCurrency: "USD",
                unitCode: "MON",
              },
            }
          : {}),
      })),
    },
    serviceOutput: services.map((s) => s.title),
  };
}

export function faqSchema(): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/faq")}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(input: {
  path: string;
  headline: string;
  description: string;
  section?: string;
}): JsonLd {
  return {
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    ...(input.section ? { articleSection: input.section } : {}),
    publisher: { "@id": ORG_ID },
    author: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    inLanguage: "en",
  };
}

export function collectionSchema(path: string, name: string, description: string): JsonLd {
  return {
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": SITE_ID },
  };
}

export function simplePageSchema(
  type: "AboutPage" | "ContactPage",
  path: string,
  name: string,
  description: string
): JsonLd {
  return {
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

/** Wraps one or more schema nodes into a single @graph document. */
export function graph(...nodes: (JsonLd | null)[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  });
}

/**
 * Builds the complete structured-data graph for a route from the schema types
 * stored in the database (falling back to the compiled-in defaults), plus its
 * breadcrumb trail. Pages render this with a single <JsonLd> element.
 */
export async function pageGraph(path: string): Promise<string> {
  const entry = await getPage(path);
  if (!entry) return graph(null);

  const nodes: (JsonLd | null)[] = [];

  for (const type of entry.schemaTypes ?? []) {
    switch (type) {
      case "Service":
        nodes.push(serviceSchema());
        break;
      case "FAQPage":
        nodes.push(faqSchema());
        break;
      case "CollectionPage":
        nodes.push(collectionSchema(entry.path, entry.title, entry.description));
        break;
      case "AboutPage":
      case "ContactPage":
        nodes.push(simplePageSchema(type as "AboutPage" | "ContactPage", entry.path, entry.title, entry.description));
        break;
      // Organization and WebSite are emitted site-wide in the root layout.
      case "Organization":
      case "WebSite":
      case "Article":
        break;
    }
  }

  nodes.push(breadcrumbFromTrail(entry.breadcrumb));
  return graph(...nodes);
}

function breadcrumbFromTrail(trail: { name: string; path: string }[]): JsonLd | null {
  if (!trail?.length) return null;
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
