import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getPage, getSettings } from "@/lib/seo/repository";
import { PageEditor } from "./PageEditor";

export const dynamic = "force-dynamic";

export default async function EditPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const { path } = await searchParams;
  if (!path) redirect("/admin");

  const [page, settings] = await Promise.all([getPage(path), getSettings()]);
  if (!page) notFound();

  return (
    <div>
      <Link href="/admin" className="text-xs text-navy/50 hover:text-royal">
        ← All pages
      </Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-navy">{page.path}</h1>
      <p className="mt-1 text-sm text-gray-dark">
        Changes go live immediately on save.
        {page.updatedAt && ` Last updated ${new Date(page.updatedAt).toLocaleString()}.`}
      </p>

      <div className="mt-8">
        <PageEditor page={page} baseUrl={settings.baseUrl} />
      </div>
    </div>
  );
}
