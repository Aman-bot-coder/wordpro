import { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { pricing, roi, capacity } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Foundation, Authority and Partner — narrative infrastructure plans for founders.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Three plans. One capacity limit."
        body={capacity}
      />

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {pricing.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col rounded-2xl p-9 transition-transform duration-300 hover:-translate-y-1.5 ${
                  plan.tag ? "glass border-2 border-[var(--color-yellow)] shadow-xl" : "glass"
                }`}
              >
                {plan.tag && (
                  <div className="absolute -top-3 left-9 rounded-full bg-[var(--color-yellow)] px-3 py-1 text-xs font-bold text-navy">
                    {plan.tag}
                  </div>
                )}
                <h2 className="text-2xl font-semibold text-navy">{plan.name}</h2>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-navy">{plan.price}</span>
                  <span className="text-sm text-gray-dark">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-gray-dark">{plan.audience}</p>
                <ul className="mt-8 flex-1 space-y-3 text-sm text-gray-dark">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-0.5 text-royal">—</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/contact" className="mt-8 w-full justify-center" variant={plan.tag ? "primary" : "secondary"}>
                  Apply for This Plan
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-navy/5 bg-gray-light px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="eyebrow text-royal">The Math</div>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-navy">{roi.annualAuthority}/year</p>
            <p className="mt-4 text-lg leading-relaxed text-gray-dark">{roi.comparison}</p>
            <p className="mt-6 text-sm font-medium text-navy">{roi.offer}</p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
