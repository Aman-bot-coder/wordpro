import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { AuditForm } from "@/components/AuditForm";
import { contactPage, site } from "@/lib/content";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/contact");

export default async function ContactPage() {
  return (
    <>
      <JsonLd data={await pageGraph("/contact")} />

      {/* HERO + FORM */}
      <section className="grid-texture relative overflow-hidden px-6 pb-28 pt-40 md:pt-48">
        <div className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-royal/10 blur-[140px]" />
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <div className="eyebrow text-royal">Contact</div>
              <h1 className="text-balance mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-navy md:text-5xl">
                {contactPage.headline}
              </h1>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-royal">
                {contactPage.orLabel}
              </p>
              <p className="mt-3 max-w-md text-lg font-semibold leading-relaxed text-navy">
                {contactPage.lead}
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-gray-dark">
                {contactPage.intro}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 space-y-3 text-sm text-gray-dark">
              <p>
                Prefer to book directly?{" "}
                <a href={site.booking} target="_blank" rel="noreferrer" className="text-royal underline">
                  Schedule on Zoho Bookings →
                </a>
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <AuditForm />
          </Reveal>
        </div>
      </section>

      {/* TWO WAYS TO START */}
      <section className="border-t border-navy/5 bg-gray-light px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader eyebrow="Get Started" title={contactPage.waysTitle} align="center" />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal>
              <GlassCard className="flex h-full flex-col p-10">
                <div className="eyebrow text-royal">{contactPage.optionOne.label}</div>
                <h3 className="mt-3 text-2xl font-semibold text-navy">{contactPage.optionOne.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-dark">{contactPage.optionOne.body}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-dark">{contactPage.optionOne.body2}</p>
                <div className="mt-8">
                  <Button href={site.booking}>{contactPage.optionOne.cta}</Button>
                </div>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.08}>
              <GlassCard className="flex h-full flex-col p-10">
                <div className="eyebrow text-royal">{contactPage.optionTwo.label}</div>
                <h3 className="mt-3 text-2xl font-semibold text-navy">{contactPage.optionTwo.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-dark">{contactPage.optionTwo.body}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-dark">{contactPage.optionTwo.body2}</p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BEFORE YOU REACH OUT */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionHeader eyebrow="Good to know" title={contactPage.beforeTitle} align="center" />
          </Reveal>
          <div className="mt-12 space-y-4">
            {contactPage.beforePoints.map((point, i) => (
              <Reveal key={point} delay={i * 0.06}>
                <div className="glass flex gap-4 rounded-2xl border-l-4 border-l-[var(--color-yellow)] p-6">
                  <span className="mt-0.5 text-royal">✓</span>
                  <p className="text-sm leading-relaxed text-gray-dark">{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
