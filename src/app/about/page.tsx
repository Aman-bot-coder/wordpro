import { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { CTASection } from "@/components/CTASection";
import { about, capacity } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: about.positioning,
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title={about.positioning} />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-8">
          {about.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="text-lg leading-relaxed text-gray-dark">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-navy/5 bg-gray-light px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="p-10">
              <div className="eyebrow text-royal">The Human-Writing Guarantee</div>
              <p className="mt-4 text-lg leading-relaxed text-gray-dark">
                Every piece is written by a senior human writer, never generated. AI tools are used only for
                research and structuring — never to draft the final voice. Content is built from IP extracted
                directly from the founder, so it reads as them because it comes from them.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            <GlassCard className="p-10">
              <div className="eyebrow text-royal">Capacity Model</div>
              <p className="mt-4 text-lg leading-relaxed text-gray-dark">{capacity}</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
