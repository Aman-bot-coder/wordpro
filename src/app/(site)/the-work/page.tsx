import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CTASection } from "@/components/CTASection";
import { theWork, stats } from "@/lib/content";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/the-work");

const workStats = stats.filter((s) => ["58%", "527%", "92%"].includes(s.value));

function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p key={i} className={`${className ?? ""} ${i > 0 ? "mt-4" : ""}`}>
          {p}
        </p>
      ))}
    </>
  );
}

export default async function TheWorkPage() {
  return (
    <>
      <JsonLd data={await pageGraph("/the-work")} />

      {/* HERO */}
      <section className="grid-texture relative overflow-hidden px-6 pb-20 pt-40 md:pt-48">
        <div className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-royal/10 blur-[140px]" />
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="eyebrow text-royal">{theWork.hero.eyebrow}</div>
            <h1 className="text-balance mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-navy md:text-6xl">
              {theWork.hero.title}
            </h1>
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-dark">
              <Paragraphs text={theWork.hero.body} />
            </div>
            <div className="mt-8">
              <Button href="/contact">Book Your 30-Min Authority Audit</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-6xl space-y-6">
          {theWork.pillars.map((p) => (
            <Reveal key={p.n}>
              <GlassCard className="p-10">
                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
                  <div>
                    <div className="font-mono text-sm text-royal">Pillar {p.n}</div>
                    <h2 className="mt-3 text-3xl font-semibold text-navy">{p.title}</h2>
                    <p className="mt-3 text-lg italic text-royal/90">{p.tagline}</p>
                    <div className="mt-5 leading-relaxed text-gray-dark">
                      <Paragraphs text={p.body} />
                    </div>
                  </div>
                  <ul className="space-y-3 md:border-l md:border-navy/10 md:pl-8">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed text-gray-dark">
                        <span className="mt-1 text-royal">—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 border-t border-navy/10 pt-5 text-sm font-medium text-navy">{p.closing}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WEBSITE DEVELOPMENT FOUNDATION */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="glass rounded-2xl border-l-4 border-l-[var(--color-yellow)] p-10">
              <div className="eyebrow text-royal">{theWork.foundation.eyebrow}</div>
              <h2 className="mt-3 text-3xl font-semibold text-navy">{theWork.foundation.title}</h2>
              <p className="mt-3 text-lg italic text-royal/90">{theWork.foundation.tagline}</p>
              <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_1fr]">
                <div className="leading-relaxed text-gray-dark">
                  <Paragraphs text={theWork.foundation.body} />
                </div>
                <ul className="space-y-3">
                  {theWork.foundation.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-gray-dark">
                      <span className="mt-1 text-royal">—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 border-t border-navy/10 pt-5 text-sm font-medium text-navy">{theWork.foundation.closing}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXECUTIVE AUTHORITY STACK */}
      <section className="grid-texture-dark noise relative overflow-hidden bg-navy px-6 py-28 text-white">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="eyebrow text-[var(--color-yellow)]">{theWork.stack.eyebrow}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{theWork.stack.title}</h2>
            <p className="mt-3 text-lg text-white/70">{theWork.stack.tagline}</p>
            <p className="mt-5 max-w-3xl leading-relaxed text-white/60">{theWork.stack.intro}</p>
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

      {/* WHAT YOU ARE ACTUALLY INVESTING IN */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="eyebrow text-royal">{theWork.investing.eyebrow}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">{theWork.investing.title}</h2>
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

      {/* WHAT HAPPENS AFTER YOU SAY YES */}
      <section className="border-y border-navy/5 bg-gray-light px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="eyebrow text-royal">{theWork.timeline.eyebrow}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">{theWork.timeline.title}</h2>
          </Reveal>
          <div className="mt-14 space-y-4">
            {theWork.timeline.phases.map((ph, i) => (
              <Reveal key={ph.phase} delay={i * 0.06}>
                <div className="glass grid gap-4 rounded-2xl p-7 md:grid-cols-[160px_1fr_1fr] md:items-center">
                  <div>
                    <div className="eyebrow text-royal">{ph.phase}</div>
                    <div className="mt-1 text-lg font-semibold text-navy">{ph.title}</div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-dark">{ph.body}</p>
                  <div className="text-sm text-navy">
                    <span className="eyebrow text-navy/40">Deliverable</span>
                    <p className="mt-1">{ph.deliverable}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* THE NUMBERS BEHIND THE SHIFT */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-balance max-w-2xl text-3xl font-semibold tracking-tight text-navy md:text-4xl">
              {theWork.stats.title}
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
          <Reveal className="mt-10">
            <p className="max-w-3xl leading-relaxed text-gray-dark">{theWork.stats.closing}</p>
          </Reveal>
        </div>
      </section>

      {/* GET ONE ARTICLE FREE */}
      <section className="border-t border-navy/5 px-6 py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="eyebrow text-royal">{theWork.freeArticle.eyebrow}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">{theWork.freeArticle.title}</h2>
            <div className="mt-5 text-lg leading-relaxed text-gray-dark">
              <Paragraphs text={theWork.freeArticle.body} />
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact">{theWork.freeArticle.cta}</Button>
              <Button href="/contact" variant="secondary">Book Your 30-Min Authority Audit</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
