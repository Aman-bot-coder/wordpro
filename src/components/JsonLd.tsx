/** Renders a pre-serialised JSON-LD graph. Content comes from lib/schema.ts. */
export function JsonLd({ data }: { data: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}
