import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Prose } from "@/components/Prose";
import { CTASection } from "@/components/CTASection";
import { insights } from "@/lib/insights";

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((a) => a.slug === slug);
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
  const article = insights.find((a) => a.slug === slug);
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

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Prose>{article.body}</Prose>
        </div>
      </section>

      <CTASection />
    </>
  );
}
