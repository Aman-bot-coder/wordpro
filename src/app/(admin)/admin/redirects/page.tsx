import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { listRedirects } from "@/lib/seo/repository";
import { deleteRedirectAction, saveRedirectAction } from "../actions";

export const dynamic = "force-dynamic";

const input =
  "w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-royal";

export default async function RedirectsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const rules = await listRedirects();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-navy">Redirects</h1>
      <p className="mt-1 text-sm text-gray-dark">
        Applied to any URL that doesn&apos;t match a real page. 301 is permanent, 302 temporary.
      </p>

      <form
        action={saveRedirectAction}
        className="mt-8 grid items-end gap-4 rounded-2xl border border-navy/10 bg-white p-6 sm:grid-cols-[1fr_1fr_auto_auto_auto]"
      >
        <label className="block">
          <span className="text-xs font-medium text-navy">From</span>
          <input name="fromPath" required placeholder="/old-page" className={`mt-2 ${input}`} />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-navy">To</span>
          <input name="toPath" required placeholder="/new-page" className={`mt-2 ${input}`} />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-navy">Type</span>
          <select name="statusCode" defaultValue="301" className={`mt-2 ${input}`}>
            <option value="301">301</option>
            <option value="302">302</option>
          </select>
        </label>
        <label className="flex items-center gap-2 pb-2 text-sm text-navy">
          <input type="checkbox" name="enabled" defaultChecked />
          Active
        </label>
        <button className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-royal">
          Add
        </button>
      </form>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-navy/10 bg-gray-light/60">
            <tr className="text-xs uppercase tracking-wider text-navy/50">
              <th className="px-5 py-3 font-medium">From</th>
              <th className="px-5 py-3 font-medium">To</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {rules.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-gray-dark">
                  No redirects yet.
                </td>
              </tr>
            )}
            {rules.map((rule) => (
              <tr key={rule.fromPath} className="hover:bg-gray-light/40">
                <td className="px-5 py-4 font-mono text-xs text-navy">{rule.fromPath}</td>
                <td className="px-5 py-4 font-mono text-xs text-royal">{rule.toPath}</td>
                <td className="px-5 py-4 text-gray-dark">{rule.statusCode}</td>
                <td className="px-5 py-4">
                  {rule.enabled ? (
                    <span className="text-emerald-600">Active</span>
                  ) : (
                    <span className="text-navy/40">Disabled</span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  {rule.id > 0 ? (
                    <form action={deleteRedirectAction}>
                      <input type="hidden" name="id" value={rule.id} />
                      <button className="text-xs font-medium text-red-600 hover:underline">Delete</button>
                    </form>
                  ) : (
                    <span className="text-xs text-navy/30">default</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
