import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import { HeroSceneLoader } from "@/components/HeroSceneLoader";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CTASection } from "@/components/CTASection";
import {
  hero,
  stats,
  costOfSilence,
  authorityStack,
  caseStudies,
  process,
  pricing,
  faqs,
  homeDiscovery,
  homeSearchFocus,
  homeServices,
} from "@/lib/content";
import Link from "next/link";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/");

const problemShift = [
  {
    label: "Silence",
    note: "The work is real, but nothing surfaces when someone looks you up.",
    dot: "border-navy/25",
  },
  {
    label: "Visibility",
    note: "Your thinking shows up where investors, buyers and talent already search.",
    dot: "border-royal",
  },
  {
    label: "Authority",
    note: "You're the reference point — chosen before the first conversation happens.",
    dot: "border-[var(--color-yellow)]",
  },
];

export default async function Home() {
  return (
    <>
      <JsonLd data={await pageGraph("/")} />
      {/* 01 HERO */}
      <section className="grid-texture-dark noise relative overflow-hidden bg-navy px-6 pb-24 pt-40 md:pt-48">
        <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-royal/30 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-[var(--color-yellow)]/5 blur-[140px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="eyebrow text-[13px] font-semibold tracking-[0.2em] text-[var(--color-yellow)] md:text-sm">
              {hero.eyebrow}
            </div>
            <h1 className="text-balance mt-6 text-[13vw] font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-[4.6vw]">
              {hero.headline}
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/70">{hero.sub}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">{hero.ctaPrimary}</Button>
              <Button href="/the-system" variant="outlineLight">
                {hero.ctaSecondary}
              </Button>
            </div>
          </div>
          <HeroSceneLoader />
        </div>
      </section>

      {/* 02 TRUST / AUTHORITY SIGNAL */}
      <section className="relative overflow-hidden border-y border-royal/10 bg-gradient-to-b from-[var(--color-soft-blue)] via-[var(--color-soft-blue)] to-white px-6 py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-royal/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="eyebrow text-center text-royal/70">Why authority compounds</div>
          <div className="mt-10 grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {stats.slice(0, 4).map((s, i) => (
              <Reveal
                key={s.label}
                className={`px-4 text-center md:px-6 ${
                  i > 0 ? "md:border-l md:border-royal/15" : ""
                }`}
              >
                <div className="text-3xl font-bold text-royal md:text-4xl">
                  <AnimatedCounter value={s.value} />
                </div>
                <p className="mt-2 text-xs leading-snug text-navy/60">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02b THREE DISCOVERY LAYERS */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Three discovery layers, one service"
              title={homeDiscovery.title}
              body={homeDiscovery.body}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {homeDiscovery.layers.map((layer, i) => (
              <Reveal key={layer.k} delay={i * 0.08}>
                <GlassCard className="h-full p-8 transition-transform duration-300 hover:-translate-y-1.5">
                  <div className="font-mono text-sm text-royal">0{i + 1}</div>
                  <h3 className="mt-3 text-2xl font-semibold text-navy">{layer.k}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-dark">{layer.v}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 THE PROBLEM */}
      <section className="px-6 py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <div className="eyebrow flex items-center gap-3 text-royal">
              <span className="opacity-60">03</span>
              <span>The Problem</span>
            </div>
            <h2 className="text-balance mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-navy md:text-5xl">
              The gap between building something remarkable and being known for it.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-dark">
              Founders intend to publish. Shipping takes priority — it&apos;s a prioritization
              problem, not a discipline issue. That gap is exactly what wrds.pro is built to close.
              Permanently.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="glass relative h-full rounded-2xl p-8">
              <div className="eyebrow text-navy/40">The shift</div>
              <div className="relative mt-8 space-y-9 pl-8">
                <span
                  aria-hidden
                  className="absolute bottom-3 left-[5px] top-3 w-px bg-gradient-to-b from-navy/15 via-royal/50 to-[var(--color-yellow)]"
                />
                {problemShift.map((step) => (
                  <div key={step.label} className="relative">
                    <span
                      aria-hidden
                      className={`absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border-2 bg-white ${step.dot}`}
                    />
                    <div className="text-base font-semibold text-navy">{step.label}</div>
                    <div className="mt-1 text-sm leading-relaxed text-gray-dark">{step.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 COST OF SILENCE */}
      <section className="grid-texture-dark noise relative overflow-hidden bg-navy px-6 py-32 text-white">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="eyebrow text-[var(--color-yellow)]">04 — The Cost of Silence</div>
            <h2 className="text-balance mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
              Every quarter of silence has a price.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {costOfSilence.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.08}>
                <GlassCard dark className="h-full p-8 transition-transform duration-300 hover:-translate-y-1.5">
                  <div className="font-mono text-sm text-[var(--color-yellow)]">{item.n}</div>
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-base italic text-white/90">{item.line}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{item.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 EXECUTIVE AUTHORITY STACK */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              index="05"
              eyebrow="The Executive Authority Stack"
              title="Three layers. One compounding asset."
              body="Signal Audit maps the terrain. IP Engine extracts the thinking. Deployment turns it into an intellectual asset class — narrative infrastructure that compounds instead of expiring."
            />
          </Reveal>
          <div className="relative mt-16 space-y-4">
            {authorityStack.map((layer, i) => (
              <Reveal key={layer.n} delay={i * 0.1}>
                <div
                  className="glass flex flex-col gap-4 rounded-2xl border-l-4 border-l-[var(--color-yellow)] p-8 transition-transform duration-300 hover:translate-x-2 md:flex-row md:items-center md:gap-10"
                  style={{ marginLeft: `${i * 24}px` }}
                >
                  <div className="font-mono text-2xl text-royal md:w-16">{layer.n}</div>
                  <div className="md:w-64">
                    <h3 className="text-2xl font-semibold text-navy">{layer.title}</h3>
                  </div>
                  <p className="text-gray-dark md:flex-1">{layer.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <p className="eyebrow text-navy/50">↓ locks together into ↓</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-navy">NARRATIVE INFRASTRUCTURE</p>
          </Reveal>
        </div>
      </section>

      {/* 07 CASE STUDY PREVIEW */}
      <section className="border-y border-navy/5 bg-gray-light px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader index="07" eyebrow="Proof" title="Ninety days. Real outcomes." />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 0.1}>
                <Link href={`/case-studies/${cs.slug}`}>
                  <GlassCard className="h-full p-8 transition-transform duration-300 hover:-translate-y-1.5">
                    <div className="eyebrow text-royal">
                      {cs.industry} · {cs.geo}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-navy">{cs.client}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-dark">{cs.outcome}</p>
                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-navy/10 pt-6">
                      {cs.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <div className="text-2xl font-bold text-navy">
                            <AnimatedCounter value={m.value} />
                          </div>
                          <div className="mt-1 text-xs text-gray-dark">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/case-studies" variant="secondary">
              View All Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* 08 SEO + GEO */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              index="08"
              eyebrow="SEO + GEO"
              title="Discoverable by Google. Cited by AI."
              body="58% of buyers have replaced Google with AI tools for vendor research. Every wrds.pro plan is built for both search layers from day one."
            />
          </Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {["Query", "Search", "Content", "Authority", "AI Retrieval", "Citation"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <div className="glass rounded-full px-5 py-3 text-sm font-semibold text-navy">{step}</div>
                {i < arr.length - 1 && <span className="text-royal">→</span>}
              </div>
            ))}
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {homeSearchFocus.items.map((item, i) => (
              <Reveal key={item.k} delay={i * 0.08}>
                <GlassCard className="h-full p-7">
                  <h3 className="text-lg font-semibold text-navy">{item.k}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-dark">{item.v}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/seo-geo" variant="secondary">
              Explore SEO + GEO
            </Button>
          </div>
        </div>
      </section>

      {/* 09 PROCESS */}
      <section className="grid-texture border-y border-navy/5 bg-gray-light px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader index="09" eyebrow="Process" title="From silence to compounding authority." />
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-5">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08} className="relative">
                <div className="eyebrow text-royal">{step.phase}</div>
                <div className="mt-3 text-3xl font-bold text-navy/20">{step.n}</div>
                <h3 className="mt-2 text-lg font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-dark">{step.body}</p>
                {i < process.length - 1 && (
                  <div className="absolute right-0 top-2 hidden h-px w-8 translate-x-full bg-navy/15 md:block" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 09b ALL SERVICES IN ONE PLACE */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="One package, every channel"
              title={homeServices.title}
              body={homeServices.body}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeServices.items.map((item, i) => (
              <Reveal key={item.k} delay={i * 0.06}>
                <GlassCard className="h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-navy">{item.k}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-dark">{item.v}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10 PRICING PREVIEW */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader index="10" eyebrow="Investment" title="Eight founders accepted per quarter." align="center" />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {pricing.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl p-8 ${
                    plan.tag ? "glass border-2 border-[var(--color-yellow)]" : "glass"
                  }`}
                >
                  {plan.tag && (
                    <div className="absolute -top-3 left-8 rounded-full bg-[var(--color-yellow)] px-3 py-1 text-xs font-bold text-navy">
                      {plan.tag}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-navy">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-navy">{plan.price}</span>
                    <span className="text-sm text-gray-dark">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-dark">{plan.audience}</p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm text-gray-dark">
                    {plan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-royal">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/pricing">See Full Pricing</Button>
          </div>
        </div>
      </section>

      {/* 11 FAQ PREVIEW */}
      <section className="border-y border-navy/5 bg-gray-light px-6 py-32">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeader index="11" eyebrow="FAQ" title="Common questions." align="center" />
          </Reveal>
          <div className="mt-12 divide-y divide-navy/10">
            {faqs.slice(0, 4).map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-navy">
                  <span className="font-medium">{f.q}</span>
                  <span className="ml-4 text-royal transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-dark">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/faq" variant="secondary">
              View All FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* 12 FINAL CTA */}
      <CTASection />
    </>
  );
}
