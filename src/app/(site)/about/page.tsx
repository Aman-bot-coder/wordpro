import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { CTASection } from "@/components/CTASection";
import { aboutDoc } from "@/lib/content";

export const revalidate = 300;

export const generateMetadata = () => buildMetadata("/about");

export default async function AboutPage() {
  return (
    <>
      <JsonLd data={await pageGraph("/about")} />
      <PageHero eyebrow="About" title={aboutDoc.title} body={aboutDoc.subtitle} />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Prose>{aboutDoc.body}</Prose>
        </div>
      </section>

      <CTASection />
    </>
  );
}
