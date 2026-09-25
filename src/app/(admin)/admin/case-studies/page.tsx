import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { listCaseStudies } from "@/lib/content-store";
import { isDatabaseReachable } from "@/lib/db/pool";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudyList({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { saved } = await searchParams;
  const [items, dbOk] = await Promise.all([listCaseStudies({ includeDrafts: true }), isDatabaseReachable()]);

  return (
    <div>
      {!dbOk && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <strong>Database unreachable.</strong> Showing compiled-in case studies; new ones can&apos;t be saved until the
          database is reachable. Run <code className="font-mono">npm run content:setup</code> once.
        </div>
      )}
      {saved && (
        <div className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          Saved <code className="font-mono">{saved}</code> — it&apos;s live on /case-studies.
        </div>
      )}

      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy">Case Studies</h1>
          <p className="mt-1 text-sm text-gray-dark">{items.length} case studies</p>
        </div>
        <Link href="/admin/case-studies/edit" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-royal">
          + New case study
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-navy/10 bg-gray-light/60">
            <tr className="text-xs uppercase tracking-wider text-navy/50">
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Industry</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {items.map((c) => (
              <tr key={c.slug} className="hover:bg-gray-light/40">
                <td className="px-5 py-4 text-navy">{c.client}</td>
                <td className="px-5 py-4 text-gray-dark">{c.industry || "—"}</td>
                <td className="px-5 py-4">
                  {c.published ? <span className="text-emerald-600">Published</span> : <span className="text-amber-600">Draft</span>}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/admin/case-studies/edit?slug=${encodeURIComponent(c.slug)}`} className="text-xs font-medium text-royal hover:underline">
                    Edit
                  </Link>
                  <Link href={`/case-studies/${c.slug}`} className="ml-4 text-xs text-navy/40 hover:text-royal" target="_blank">
                    View ↗
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
