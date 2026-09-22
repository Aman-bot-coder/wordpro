import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { CTASection } from "@/components/CTASection";
import { authorityStack, process, capacity, idealClient, theSystem } from "@/lib/content";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/the-system");

export default async function TheSystemPage() {
  return (
    <>
      <JsonLd data={await pageGraph("/the-system")} />
      <PageHero
        eyebrow={theSystem.hero.eyebrow}
        title={theSystem.hero.title}
        body={theSystem.hero.body}
      />

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-5xl space-y-4">
          {authorityStack.map((layer, i) => (
            <Reveal key={layer.n} delay={i * 0.1}>
              <div
                className="glass flex flex-col gap-4 rounded-2xl border-l-4 border-l-[var(--color-yellow)] p-10 md:flex-row md:items-center md:gap-10"
                style={{ marginLeft: `${i * 28}px` }}
              >
                <div className="font-mono text-3xl text-royal md:w-16">{layer.n}</div>
                <div className="md:w-64">
                  <h2 className="text-3xl font-semibold text-navy">{layer.title}</h2>
                </div>
                <p className="text-lg text-gray-dark md:flex-1">{layer.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal className="pt-10 text-center">
            <p className="eyebrow text-navy/50">↓ locks together into ↓</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-navy">NARRATIVE INFRASTRUCTURE</p>
          </Reveal>
        </div>
      </section>

      <section className="grid-texture-dark border-y border-white/10 bg-navy px-6 py-32 text-white">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="eyebrow text-[var(--color-yellow)]">The Timeline</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              How the stack gets built, week by week.
            </h2>
          </Reveal>
          <div className="relative mt-16 grid gap-8 md:grid-cols-5">
            <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-royal via-[var(--color-yellow)] to-royal md:block" />
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08} className="relative">
                <div className="eyebrow text-white/50">{step.phase}</div>
                <div className="relative z-10 mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-yellow)] font-mono text-sm font-bold text-navy">
                  {step.n}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full p-10">
              <div className="eyebrow text-royal">Built For</div>
              <ul className="mt-4 space-y-3 text-gray-dark">
                {idealClient.fit.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-royal">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="h-full p-10">
              <div className="eyebrow text-gray-dark">Not a Fit</div>
              <ul className="mt-4 space-y-3 text-gray-dark">
                {idealClient.notFit.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-navy/30">✕</span>
                    {f}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-10 max-w-6xl">
          <p className="eyebrow text-navy/50">Capacity</p>
          <p className="mt-2 max-w-2xl text-lg text-gray-dark">{capacity}</p>
        </Reveal>
        <Reveal className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-balance text-2xl font-semibold italic leading-snug text-navy md:text-3xl">
            {theSystem.closing}
          </p>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
