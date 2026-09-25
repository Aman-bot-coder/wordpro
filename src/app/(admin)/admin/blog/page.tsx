import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { listBlogs } from "@/lib/content-store";
import { isDatabaseReachable } from "@/lib/db/pool";

export const dynamic = "force-dynamic";

export default async function AdminBlogList({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { saved } = await searchParams;
  const [posts, dbOk] = await Promise.all([listBlogs({ includeDrafts: true }), isDatabaseReachable()]);

  return (
    <div>
      {!dbOk && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <strong>Database unreachable.</strong> Showing compiled-in posts; new posts can&apos;t be saved until the
          database is reachable. Run <code className="font-mono">npm run content:setup</code> once.
        </div>
      )}
      {saved && (
        <div className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          Saved <code className="font-mono">{saved}</code> — it&apos;s live on /insights.
        </div>
      )}

      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy">Blog</h1>
          <p className="mt-1 text-sm text-gray-dark">{posts.length} posts</p>
        </div>
        <Link href="/admin/blog/edit" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-royal">
          + New post
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-navy/10 bg-gray-light/60">
            <tr className="text-xs uppercase tracking-wider text-navy/50">
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {posts.map((p) => (
              <tr key={p.slug} className="hover:bg-gray-light/40">
                <td className="max-w-md px-5 py-4 text-navy">{p.title}</td>
                <td className="px-5 py-4 text-gray-dark">{p.category || "—"}</td>
                <td className="px-5 py-4">
                  {p.published ? <span className="text-emerald-600">Published</span> : <span className="text-amber-600">Draft</span>}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/admin/blog/edit?slug=${encodeURIComponent(p.slug)}`} className="text-xs font-medium text-royal hover:underline">
                    Edit
                  </Link>
                  <Link href={`/insights/${p.slug}`} className="ml-4 text-xs text-navy/40 hover:text-royal" target="_blank">
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
