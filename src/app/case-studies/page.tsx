import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CTASection } from "@/components/CTASection";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Ninety-day narrative infrastructure engagements and their outcomes.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Ninety days. Real outcomes."
        body="Three anonymized engagements. Every metric below is as reported — nothing here is projected or invented."
      />

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl space-y-8">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.06}>
              <Link href={`/case-studies/${cs.slug}`}>
                <GlassCard className="grid gap-8 p-10 transition-transform duration-300 hover:-translate-y-1 md:grid-cols-[1fr_1.2fr]">
                  <div>
                    <div className="eyebrow text-royal">
                      {cs.industry} · {cs.geo}
                    </div>
                    <h2 className="mt-3 text-3xl font-semibold text-navy">{cs.client}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-gray-dark">{cs.challenge}</p>
                    <p className="mt-3 text-sm font-medium text-navy">{cs.outcome}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 border-t border-navy/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    {cs.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-2xl font-bold text-navy md:text-3xl">
                          <AnimatedCounter value={m.value} />
                        </div>
                        <div className="mt-1 text-xs leading-snug text-gray-dark">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
