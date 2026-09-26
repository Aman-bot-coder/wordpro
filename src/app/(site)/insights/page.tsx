import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { CTASection } from "@/components/CTASection";
import { listBlogs } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export const generateMetadata = () => buildMetadata("/insights");

export default async function InsightsPage() {
  const [featured, ...rest] = await listBlogs();

  if (!featured) {
    return (
      <>
        <JsonLd data={await pageGraph("/insights")} />
        <PageHero eyebrow="Insights" title="Thinking on narrative infrastructure." body="New articles are on the way." />
        <CTASection />
      </>
    );
  }

  return (
    <>
      <JsonLd data={await pageGraph("/insights")} />
      <PageHero
        eyebrow="Insights"
        title="Thinking on narrative infrastructure."
        body="Long-form writing on SEO, GEO, founder authority and the mechanics of becoming discoverable."
      />

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl">
          {/* Featured article */}
          <Reveal>
            <Link href={`/insights/${featured.slug}`}>
              <GlassCard className="overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1">
                {featured.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="h-64 w-full border-b border-navy/10 object-cover md:h-80"
                  />
                )}
                <div className="p-10">
                <div className="eyebrow text-royal">Featured · {featured.category}</div>
                <h2 className="text-balance mt-4 text-3xl font-semibold leading-tight tracking-tight text-navy md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-dark">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-royal">
                  Read article <span aria-hidden>→</span>
                </span>
                </div>
              </GlassCard>
            </Link>
          </Reveal>

          {/* Latest thinking */}
          <div className="mt-14">
            <div className="eyebrow text-navy/50">Latest thinking</div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {rest.map((article, i) => (
                <Reveal key={article.slug} delay={i * 0.08}>
                  <Link href={`/insights/${article.slug}`} className="block h-full">
                    <GlassCard className="flex h-full flex-col overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1.5">
                      {article.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="h-44 w-full border-b border-navy/10 object-cover"
                        />
                      )}
                      <div className="flex flex-1 flex-col p-8">
                      <div className="eyebrow text-royal">{article.category}</div>
                      <h3 className="mt-3 text-xl font-semibold leading-snug text-navy">{article.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-dark">{article.excerpt}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-royal">
                        Read <span aria-hidden>→</span>
                      </span>
                      </div>
                    </GlassCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
