import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Prose } from "@/components/Prose";
import { CTASection } from "@/components/CTASection";
import { caseStudies } from "@/lib/caseStudies";

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
    description: cs.summary,
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
        <div className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-royal/10 blur-[140px]" />
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="eyebrow text-royal">
              {cs.industry} · {cs.geo}
            </div>
            <h1 className="text-balance mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-navy md:text-5xl">
              {cs.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-dark">{cs.summary}</p>
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

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Prose>{cs.body}</Prose>
        </div>
      </section>

      <CTASection />
    </>
  );
}
