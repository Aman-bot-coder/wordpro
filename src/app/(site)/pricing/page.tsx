import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { pricingDoc } from "@/lib/content";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/pricing");

export default async function PricingPage() {
  return (
    <>
      <JsonLd data={await pageGraph("/pricing")} />
      <PageHero eyebrow="Pricing" title={pricingDoc.hero.title} body={pricingDoc.hero.body} />

      <div className="px-6">
        <div className="mx-auto -mt-6 max-w-6xl">
          <Button href="/contact">Book Your Authority Audit</Button>
        </div>
      </div>

      {/* PLANS */}
      <section className="px-6 pb-24 pt-16">
        <div className="mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-3">
          {pricingDoc.plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col rounded-2xl p-9 transition-transform duration-300 hover:-translate-y-1.5 ${
                  plan.highlight ? "glass border-2 border-[var(--color-yellow)] shadow-xl" : "glass"
                }`}
              >
                <h2 className="text-xl font-bold tracking-wide text-navy">{plan.name}</h2>
                <div className="mt-4 text-3xl font-bold text-navy">{plan.price}</div>
                <p className="mt-1 text-sm italic text-royal">{plan.tagline}</p>

                {plan.lead && (
                  <div className="mt-6 rounded-xl bg-[var(--color-yellow)]/15 px-4 py-3 text-sm font-semibold text-navy">
                    {plan.lead}
                  </div>
                )}
                {plan.leadNote && <p className="mt-4 text-sm font-medium text-navy">{plan.leadNote}</p>}

                <ul className="mt-6 flex-1 space-y-3 text-sm text-gray-dark">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-0.5 text-royal">—</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {plan.note && <p className="mt-6 text-sm italic text-gray-dark">{plan.note}</p>}
                <p className="mt-4 text-sm font-semibold text-navy">Ideal for: {plan.idealFor}</p>

                <Button
                  href={plan.cta.href}
                  className="mt-8 w-full justify-center"
                  variant={plan.highlight ? "primary" : "secondary"}
                >
                  {plan.cta.label}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="border-t border-navy/5 bg-gray-light px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader eyebrow="Flexible" title={pricingDoc.addOns.title} body={pricingDoc.addOns.body} />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricingDoc.addOns.items.map((item, i) => (
              <Reveal key={item.k} delay={i * 0.05}>
                <GlassCard className="h-full p-7">
                  <h3 className="text-lg font-semibold text-navy">{item.k}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-dark">{item.v}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Button href={pricingDoc.addOns.cta.href} variant="secondary">
              {pricingDoc.addOns.cta.label}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* WHAT EVERY PLAN INCLUDES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader eyebrow="Always Included" title={pricingDoc.everyPlan.title} />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricingDoc.everyPlan.items.map((item, i) => (
              <Reveal key={item.k} delay={i * 0.06}>
                <div className="glass h-full rounded-2xl border-l-4 border-l-[var(--color-yellow)] p-7">
                  <h3 className="text-lg font-semibold text-navy">{item.k}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-dark">{item.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TERMS */}
      <section className="border-y border-navy/5 bg-gray-light px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="eyebrow text-royal">{pricingDoc.terms.title}</div>
            <p className="mt-3 text-lg leading-relaxed text-gray-dark">{pricingDoc.terms.body}</p>
          </Reveal>
        </div>
      </section>

      {/* COMMON QUESTIONS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeader eyebrow="FAQ" title="Common questions" align="center" />
          </Reveal>
          <div className="mt-12 divide-y divide-navy/10">
            {pricingDoc.faqs.map((f) => (
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

      {/* NOT SURE WHICH PLAN */}
      <section className="grid-texture-dark noise relative overflow-hidden bg-navy px-6 py-28 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal/20 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {pricingDoc.notSure.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">{pricingDoc.notSure.body}</p>
          <p className="mt-6 text-lg font-semibold text-[var(--color-yellow)]">
            <a href={`mailto:${pricingDoc.notSure.email}`}>{pricingDoc.notSure.email}</a>
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact">Book Your Authority Audit</Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
