import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { faqs } from "@/lib/content";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/faq");

export default async function FAQPage() {
  return (
    <>
      <JsonLd data={await pageGraph("/faq")} />
      <PageHero eyebrow="FAQ" title="Every question, answered plainly." />

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-3xl divide-y divide-navy/10">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i * 0.03, 0.3)}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-navy">
                  <span className="text-lg font-medium">{f.q}</span>
                  <span className="shrink-0 text-2xl text-royal transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-base leading-relaxed text-gray-dark">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
