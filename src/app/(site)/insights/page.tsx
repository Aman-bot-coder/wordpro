import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/insights");

const categories = [
  "SEO & GEO",
  "Founder Authority",
  "Thought Leadership",
  "Executive Branding",
  "AI Discovery",
];

export default async function InsightsPage() {
  return (
    <>
      <JsonLd data={await pageGraph("/insights")} />
      <PageHero
        eyebrow="Insights"
        title="Thinking on narrative infrastructure."
        body="Long-form writing on SEO, GEO, founder authority and the mechanics of becoming discoverable — published as the library grows."
      />

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="eyebrow text-navy/50">Categories</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {categories.map((c) => (
                <span key={c} className="glass rounded-full px-5 py-2 text-sm font-medium text-navy">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-16 rounded-2xl border border-dashed border-navy/15 p-16 text-center">
            <p className="text-lg text-gray-dark">
              New articles publish as the wrds.pro library grows. In the meantime, explore{" "}
              <Link href="/seo-geo" className="text-royal underline">
                SEO + GEO
              </Link>{" "}
              or{" "}
              <Link href="/the-system" className="text-royal underline">
                The System
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
