import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Prose } from "@/components/Prose";
import { CTASection } from "@/components/CTASection";
import { getBlog } from "@/lib/content-store";
import { site } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlog(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
  };
}

export default async function InsightDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getBlog(slug);
  if (!article) notFound();

  return (
    <>
      <section className="grid-texture relative overflow-hidden px-6 pb-16 pt-40 md:pt-48">
        <div className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-royal/10 blur-[140px]" />
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link href="/insights" className="eyebrow text-navy/50 hover:text-royal">
              ← Insights
            </Link>
            <div className="eyebrow mt-6 text-royal">{article.category}</div>
            <h1 className="text-balance mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-navy md:text-5xl">
              {article.title}
            </h1>
          </Reveal>
        </div>
      </section>

      {article.coverImage && (
        <section className="px-6 pt-4">
          <div className="mx-auto max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.coverImage} alt={article.title} className="w-full rounded-2xl border border-navy/10 object-cover" />
          </div>
        </section>
      )}

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Prose>{article.body}</Prose>
          <div className="mt-12 border-t border-navy/10 pt-10">
            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-yellow)] px-7 py-4 text-sm font-semibold text-navy transition-colors hover:bg-[var(--color-yellow-bright)]"
            >
              Book a Free Authority Audit <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
