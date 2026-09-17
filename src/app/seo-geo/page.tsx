import { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CTASection } from "@/components/CTASection";
import { seoGeo, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "SEO + GEO",
  description: seoGeo.intro,
};

export default function SeoGeoPage() {
  const geoStats = stats.filter((s) => ["58%", "527%", "40%"].includes(s.value));

  return (
    <>
      <PageHero eyebrow="SEO + GEO" title="Discoverable by Google. Cited by AI." body={seoGeo.intro} />

      <section className="grid-texture-dark noise border-y border-white/10 bg-navy px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="eyebrow text-[var(--color-yellow)]">The Discovery Path</div>
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {seoGeo.flow.map((step, i, arr) => (
              <Reveal key={step} delay={i * 0.06} className="flex items-center gap-4">
                <div className="glass-dark rounded-full px-6 py-4 text-sm font-semibold">{step}</div>
                {i < arr.length - 1 && <span className="text-[var(--color-yellow)]">→</span>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-gray-dark">{seoGeo.body}</p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {geoStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center">
                <div className="text-4xl font-bold text-navy">
                  <AnimatedCounter value={s.value} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-dark">{s.label}</p>
                <p className="mt-1 text-xs text-navy/40">{s.source}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
