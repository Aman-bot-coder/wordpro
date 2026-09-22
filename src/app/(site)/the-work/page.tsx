import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CTASection } from "@/components/CTASection";
import { theWork, stats } from "@/lib/content";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/the-work");

const workStats = stats.filter((s) => ["58%", "527%", "92%"].includes(s.value));

function Pillar({
  n,
  title,
  tagline,
  body,
  points,
}: {
  n: string;
  title: string;
  tagline: string;
  body: string;
  points: string[];
}) {
  return (
    <Reveal>
      <GlassCard className="grid gap-8 p-10 md:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="font-mono text-sm text-royal">Pillar {n}</div>
          <h2 className="mt-3 text-3xl font-semibold text-navy">{title}</h2>
          <p className="mt-3 text-lg italic text-royal/90">{tagline}</p>
          <p className="mt-5 leading-relaxed text-gray-dark">{body}</p>
        </div>
        <ul className="space-y-3 md:border-l md:border-navy/10 md:pl-8">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-sm leading-relaxed text-gray-dark">
              <span className="mt-1 text-royal">—</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </Reveal>
  );
}

export default async function TheWorkPage() {
  return (
    <>
      <JsonLd data={await pageGraph("/the-work")} />
      <PageHero eyebrow={theWork.hero.eyebrow} title={theWork.hero.title} body={theWork.hero.body} />

      {/* Pillars */}
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-6xl space-y-6">
          {theWork.pillars.map((p) => (
            <Pillar key={p.n} {...p} />
          ))}
        </div>
      </section>

      {/* Website Development foundation */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="glass rounded-2xl border-l-4 border-l-[var(--color-yellow)] p-10">
              <div className="eyebrow text-royal">{theWork.foundation.eyebrow}</div>
              <h2 className="mt-3 text-3xl font-semibold text-navy">{theWork.foundation.title}</h2>
              <p className="mt-3 text-lg italic text-royal/90">{theWork.foundation.tagline}</p>
              <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_1fr]">
                <p className="leading-relaxed text-gray-dark">{theWork.foundation.body}</p>
                <ul className="space-y-3">
                  {theWork.foundation.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-gray-dark">
                      <span className="mt-1 text-royal">—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Executive Authority Stack */}
      <section className="grid-texture-dark noise relative overflow-hidden bg-navy px-6 py-28 text-white">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="eyebrow text-[var(--color-yellow)]">{theWork.stack.eyebrow}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              {theWork.stack.title}
            </h2>
            <p className="mt-3 text-lg text-white/70">{theWork.stack.tagline}</p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {theWork.stack.stages.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="glass-dark h-full rounded-2xl p-8">
                  <div className="font-mono text-2xl text-[var(--color-yellow)]">{s.n}</div>
                  <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{s.body}</p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <div className="eyebrow text-[10px] text-white/40">Outputs</div>
                    <p className="mt-2 text-xs leading-relaxed text-white/60">{s.outputs}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you're actually investing in */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="eyebrow text-royal">{theWork.investing.eyebrow}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
              {theWork.investing.title}
            </h2>
          </Reveal>
          <div className="mt-12 space-y-6">
            {theWork.investing.pairs.map((pair, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-navy/10 bg-gray-light p-7">
                    <div className="eyebrow text-navy/40">Not this</div>
                    <p className="mt-2 font-medium text-navy">{pair.not}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-dark">{pair.notBody}</p>
                  </div>
                  <div className="glass rounded-2xl border-l-4 border-l-royal p-7">
                    <div className="eyebrow text-royal">This instead</div>
                    <p className="mt-2 font-medium text-navy">{pair.instead}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-dark">{pair.insteadBody}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-navy/5 bg-gray-light px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-balance max-w-2xl text-3xl font-semibold tracking-tight text-navy md:text-4xl">
              The numbers behind the shift.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {workStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="text-4xl font-bold text-royal">
                  <AnimatedCounter value={s.value} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-dark">{s.label}</p>
                <p className="mt-1 text-xs text-navy/40">{s.source}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Get one article free */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="eyebrow text-royal">{theWork.freeArticle.eyebrow}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
              {theWork.freeArticle.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-dark">{theWork.freeArticle.body}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact">{theWork.freeArticle.cta}</Button>
              <Button href="/contact" variant="secondary">
                Book Your 30-Min Authority Audit
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
