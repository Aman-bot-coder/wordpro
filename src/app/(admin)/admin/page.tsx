import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { listPages } from "@/lib/seo/repository";
import { analyze } from "@/lib/seo/analyzer";
import { isDatabaseReachable } from "@/lib/db/pool";

export const dynamic = "force-dynamic";

function scoreColor(score: number): string {
  if (score >= 90) return "bg-emerald-500";
  if (score >= 75) return "bg-royal";
  if (score >= 50) return "bg-[var(--color-yellow)]";
  return "bg-red-500";
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const { saved } = await searchParams;
  const [pages, dbOk] = await Promise.all([listPages(), isDatabaseReachable()]);

  const analyses = pages.map((page) => ({
    page,
    analysis: analyze({
      path: page.path,
      title: page.title,
      description: page.description,
      focusKeyword: page.focusKeyword,
      keywords: page.keywords,
      canonical: page.canonicalOverride ?? page.path,
      robotsIndex: page.robotsIndex,
      hasSchema: page.schemaTypes.length > 0,
    }),
  }));

  const average = Math.round(
    analyses.reduce((sum, a) => sum + a.analysis.score, 0) / (analyses.length || 1)
  );

  return (
    <div>
      {!dbOk && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <strong>Database unreachable.</strong> The site is serving compiled-in defaults and edits
          cannot be saved. Check <code className="font-mono">DATABASE_URL</code>.
        </div>
      )}

      {saved && (
        <div className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          Saved <code className="font-mono">{saved}</code> — changes are live.
        </div>
      )}

      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy">Pages</h1>
          <p className="mt-1 text-sm text-gray-dark">
            {pages.length} pages · average SEO score {average}/100
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-navy/10 bg-gray-light/60">
            <tr className="text-xs uppercase tracking-wider text-navy/50">
              <th className="px-5 py-3 font-medium">Path</th>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Focus keyword</th>
              <th className="px-5 py-3 font-medium">Indexed</th>
              <th className="px-5 py-3 font-medium">Score</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {analyses.map(({ page, analysis }) => (
              <tr key={page.path} className="hover:bg-gray-light/40">
                <td className="px-5 py-4 font-mono text-xs text-navy">{page.path}</td>
                <td className="max-w-xs truncate px-5 py-4 text-navy">{page.title}</td>
                <td className="px-5 py-4 text-gray-dark">{page.focusKeyword || "—"}</td>
                <td className="px-5 py-4">
                  {page.robotsIndex ? (
                    <span className="text-emerald-600">Yes</span>
                  ) : (
                    <span className="text-amber-600">noindex</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 font-semibold text-navy">{analysis.score}</span>
                    <span className="h-1.5 w-20 overflow-hidden rounded-full bg-navy/10">
                      <span
                        className={`block h-full rounded-full ${scoreColor(analysis.score)}`}
                        style={{ width: `${analysis.score}%` }}
                      />
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/pages?path=${encodeURIComponent(page.path)}`}
                    className="text-xs font-medium text-royal hover:underline"
                  >
                    Edit
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
