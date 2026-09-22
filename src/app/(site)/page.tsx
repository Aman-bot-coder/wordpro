import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import { HeroSceneLoader } from "@/components/HeroSceneLoader";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  hero,
  stats,
  caseStudies,
  pricing,
  homeDiscovery,
  homeSubServices,
  homeServices,
  homeWhy,
  homeSearchFocus,
  homeHowItWorks,
  homeFit,
  homeFaqs,
  homeFinalCta,
} from "@/lib/content";
import Link from "next/link";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/");

export default async function Home() {
  return (
    <>
      <JsonLd data={await pageGraph("/")} />

      {/* HERO */}
      <section className="grid-texture relative overflow-hidden px-6 pb-24 pt-40 md:pt-48">
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-royal/10 blur-[140px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="eyebrow text-[13px] font-semibold tracking-[0.2em] text-royal md:text-sm">
              {hero.eyebrow}
            </div>
            <h1 className="text-balance mt-6 text-[11vw] font-semibold leading-[1.02] tracking-tight text-navy sm:text-5xl lg:text-[3.6vw]">
              {hero.headline}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-gray-dark">{hero.sub}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">{hero.ctaPrimary}</Button>
              <Button href="/the-system" variant="secondary">
                {hero.ctaSecondary}
              </Button>
            </div>
          </div>
          <HeroSceneLoader />
        </div>
      </section>

      {/* THREE DISCOVERY LAYERS */}
      <section className="border-t border-navy/5 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow="Three Discovery Layers, One Service" title={homeDiscovery.title} body={homeDiscovery.body} />
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
          <Reveal className="mt-10">
            <p className="text-lg font-medium text-navy">{homeDiscovery.closing}</p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {homeSubServices.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.05}>
                <div className="glass h-full rounded-2xl border-l-4 border-l-[var(--color-yellow)] p-8">
                  <h3 className="text-xl font-semibold text-navy">{s.k}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-dark">{s.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ALL SERVICES IN ONE PLACE */}
      <section className="border-y border-navy/5 bg-gray-light px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow="One package, every channel" title={homeServices.title} body={homeServices.body} />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeServices.items.map((item, i) => (
              <Reveal key={item.k} delay={i * 0.05}>
                <GlassCard className="h-full p-7">
                  <h3 className="text-lg font-semibold text-navy">{item.k}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-dark">{item.v}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <p className="eyebrow text-royal">{homeServices.note}</p>
          </Reveal>
        </div>
      </section>

      {/* WHY WRDS.PRO */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow="Why Wrds.Pro" title={homeWhy.title} body={homeWhy.body} />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {stats.slice(0, 4).map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className={`px-4 text-center md:px-6 ${i > 0 ? "md:border-l md:border-royal/15" : ""}`}>
                <div className="text-3xl font-bold text-royal md:text-4xl">
                  <AnimatedCounter value={s.value} />
                </div>
                <p className="mt-2 text-xs leading-snug text-navy/60">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS SHOWCASE: 90 DAYS OF CASE STUDIES */}
      <section className="border-y border-navy/5 bg-gray-light px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow="Proof" title="Results Showcase: 90 Days of Case Studies" />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 0.1}>
                <Link href={`/case-studies/${cs.slug}`}>
                  <GlassCard className="h-full p-8 transition-transform duration-300 hover:-translate-y-1.5">
                    <div className="eyebrow text-royal">{cs.industry} · {cs.geo}</div>
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
            <Button href="/case-studies" variant="secondary">View All Case Studies</Button>
          </div>
        </div>
      </section>

      {/* SEO, AEO, GEO: WHERE SHOULD THE FOCUS BE (cinematic dark) */}
      <section className="grid-texture-dark noise relative overflow-hidden bg-navy px-6 py-28 text-white">
        <div className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-royal/20 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader dark eyebrow="SEO · AEO · GEO" title={homeSearchFocus.title} body={homeSearchFocus.body} />
          </Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {["Query", "Search", "Content", "Authority", "AI Retrieval", "Citation"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <div className="glass-dark rounded-full px-5 py-3 text-sm font-semibold text-white">{step}</div>
                {i < arr.length - 1 && <span className="text-[var(--color-yellow)]">→</span>}
              </div>
            ))}
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {homeSearchFocus.items.map((item, i) => (
              <Reveal key={item.k} delay={i * 0.08}>
                <div className="glass-dark h-full rounded-2xl p-7">
                  <h3 className="text-lg font-semibold text-white">{item.k}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{item.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT DO WE DO AND HOW DOES THIS WORK */}
      <section className="grid-texture border-y border-navy/5 bg-gray-light px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow="The Method" title={homeHowItWorks.title} />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {homeHowItWorks.steps.map((step, i) => (
              <Reveal key={step.phase} delay={i * 0.08} className="relative">
                <div className="eyebrow text-royal">{step.phase}</div>
                <div className="mt-3 text-3xl font-bold text-navy/20">0{i + 1}</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-dark">{step.body}</p>
                {i < homeHowItWorks.steps.length - 1 && (
                  <div className="absolute right-0 top-2 hidden h-px w-8 translate-x-full bg-navy/15 md:block" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IS WRDS.PRO FOR YOU */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader eyebrow="Fit" title={homeFit.title} align="center" />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal>
              <GlassCard className="h-full p-10">
                <h3 className="text-lg font-semibold text-navy">{homeFit.fitHeading}</h3>
                <p className="mt-2 text-sm text-gray-dark">{homeFit.fitIntro}</p>
                <ul className="mt-5 space-y-3 text-sm text-gray-dark">
                  {homeFit.fit.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-0.5 text-royal">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.08}>
              <GlassCard className="h-full p-10">
                <h3 className="text-lg font-semibold text-navy">{homeFit.notFitHeading}</h3>
                <p className="mt-2 text-sm text-gray-dark">{homeFit.notFitIntro}</p>
                <ul className="mt-5 space-y-3 text-sm text-gray-dark">
                  {homeFit.notFit.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-0.5 text-navy/30">✕</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow="Investment" title="Plans built around your depth of authority-building." align="center" />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pricing.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.08}>
                <div className={`relative flex h-full flex-col rounded-2xl p-8 ${plan.tag ? "glass border-2 border-[var(--color-yellow)]" : "glass"}`}>
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
                      <li key={f} className="flex gap-2"><span className="text-royal">—</span>{f}</li>
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

      {/* FAQ */}
      <section className="border-y border-navy/5 bg-gray-light px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeader eyebrow="FAQ" title="FAQs" align="center" />
          </Reveal>
          <div className="mt-12 divide-y divide-navy/10">
            {homeFaqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-navy">
                  <span className="font-medium">{f.q}</span>
                  <span className="ml-4 text-royal transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-dark">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="grid-texture-dark noise relative overflow-hidden bg-navy px-6 py-32 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal/20 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {homeFinalCta.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">{homeFinalCta.body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact">Book Your Authority Audit</Button>
            <Button href="/contact" variant="outlineLight">Have a question first?</Button>
          </div>
        </div>
      </section>
    </>
  );
}
