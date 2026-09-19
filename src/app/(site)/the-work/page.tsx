import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { CTASection } from "@/components/CTASection";
import { services } from "@/lib/content";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/the-work");

export default async function TheWorkPage() {
  return (
    <>
      <JsonLd data={await pageGraph("/the-work")} />
      <PageHero
        eyebrow="The Work"
        title="Eight disciplines. One compounding system."
        body="Each service below is a component of narrative infrastructure — not a standalone deliverable. Together they turn a founder's thinking into a durable, discoverable asset."
      />

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-5xl space-y-4">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.04}>
              <details className="group" open={i === 0}>
                <GlassCard className="overflow-hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-8">
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-2xl text-royal">{s.n}</span>
                      <h2 className="text-2xl font-semibold text-navy">{s.title}</h2>
                    </div>
                    <span className="text-2xl text-royal transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="grid gap-6 border-t border-navy/10 p-8 pt-6 md:grid-cols-2">
                    <p className="text-gray-dark leading-relaxed">{s.body}</p>
                    <div>
                      <div className="eyebrow text-navy/50">Deliverables</div>
                      <ul className="mt-3 space-y-2 text-sm text-gray-dark">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex gap-2">
                            <span className="text-royal">—</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
