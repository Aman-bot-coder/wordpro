import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CTASection } from "@/components/CTASection";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.client} — Case Study`,
    description: cs.outcome,
  };
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <>
      <section className="grid-texture relative overflow-hidden px-6 pb-16 pt-40 md:pt-48">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="eyebrow text-royal">
              {cs.industry} · {cs.geo}
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-navy md:text-6xl">{cs.client}</h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-dark">{cs.outcome}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-navy/5 bg-gray-light px-6 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {cs.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06} className="text-center">
              <div className="text-3xl font-bold text-navy">
                <AnimatedCounter value={m.value} />
              </div>
              <p className="mt-2 text-xs leading-snug text-gray-dark">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl space-y-16">
          <Reveal>
            <div className="eyebrow text-royal">The Problem</div>
            <p className="mt-4 text-xl leading-relaxed text-navy">{cs.challenge}</p>
          </Reveal>
          <Reveal>
            <div className="eyebrow text-royal">The Strategic Intervention</div>
            <p className="mt-4 text-lg leading-relaxed text-gray-dark">
              A Signal Audit mapped the competitive and search terrain, followed by two IP-extraction sessions
              to pull the founder&apos;s existing frameworks and points of view. Content was then deployed on a
              consistent weekly rhythm across LinkedIn, structured for both SEO and GEO discovery.
            </p>
          </Reveal>
          <Reveal>
            <div className="eyebrow text-royal">The Outcome</div>
            <p className="mt-4 text-lg leading-relaxed text-gray-dark">{cs.outcome}</p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
