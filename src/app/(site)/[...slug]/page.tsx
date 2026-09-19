import { notFound, permanentRedirect, redirect } from "next/navigation";
import { findRedirect } from "@/lib/seo/repository";

// Catch-all for paths that match no real route. Runs only on 404-bound
// requests, so it adds zero overhead to real pages — which is why redirects
// live here rather than in proxy.ts.
export const dynamic = "force-dynamic";

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = `/${(slug ?? []).join("/")}`;

  const rule = await findRedirect(path);
  if (rule) {
    if (rule.statusCode === 301) permanentRedirect(rule.toPath);
    redirect(rule.toPath);
  }

  notFound();
}
