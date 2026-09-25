import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getCaseStudy } from "@/lib/content-store";
import { saveCaseStudyAction, deleteCaseStudyAction } from "../../content-actions";
import { MarkdownEditor, CoverImageInput } from "../../editor-widgets";

export const dynamic = "force-dynamic";

const input =
  "mt-2 w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-royal";
const label = "block text-sm font-medium text-navy";

export default async function CaseStudyEdit({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { slug } = await searchParams;
  const cs = slug ? await getCaseStudy(slug) : null;
  const isNew = !cs;
  const metrics = cs?.metrics ?? [];
  const rows = Array.from({ length: 4 }, (_, i) => metrics[i] ?? { value: "", label: "" });

  return (
    <div>
      <Link href="/admin/case-studies" className="text-xs text-navy/50 hover:text-royal">← All case studies</Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-navy">{isNew ? "New case study" : cs!.client}</h1>

      <form action={saveCaseStudyAction} className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-navy/10 bg-white p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className={label}>Client</span>
                <input name="client" required defaultValue={cs?.client} className={input} />
              </label>
              <label className="block">
                <span className={label}>Title (headline)</span>
                <input name="title" defaultValue={cs?.title} className={input} />
              </label>
              <label className="block">
                <span className={label}>Industry</span>
                <input name="industry" defaultValue={cs?.industry} className={input} />
              </label>
              <label className="block">
                <span className={label}>Location / GEO</span>
                <input name="geo" defaultValue={cs?.geo} className={input} />
              </label>
            </div>
            <label className="mt-5 block">
              <span className={label}>Summary (shown in hero + cards)</span>
              <textarea name="summary" rows={2} defaultValue={cs?.summary} className={input} />
            </label>
            <label className="mt-5 block">
              <span className={label}>Body</span>
              <div className="mt-2">
                <MarkdownEditor name="body" defaultValue={cs?.body} />
              </div>
            </label>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-navy/10 bg-white p-6">
            <label className="flex items-center gap-2 text-sm font-medium text-navy">
              <input type="checkbox" name="published" defaultChecked={cs ? cs.published : true} />
              Published
            </label>
            <label className="mt-5 block">
              <span className={label}>Slug (URL)</span>
              <input name="slug" defaultValue={cs?.slug} placeholder="auto from client" className={input} />
            </label>
            <button className="mt-6 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-royal">Save</button>
          </section>

          <section className="rounded-2xl border border-navy/10 bg-white p-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-navy/50">Metrics (up to 4)</span>
            <div className="mt-4 space-y-3">
              {rows.map((m, i) => (
                <div key={i} className="grid grid-cols-[80px_1fr] gap-2">
                  <input name="metricValue" defaultValue={m.value} placeholder="10+" className="rounded-lg border border-navy/15 bg-white px-2 py-2 text-sm text-navy outline-none focus:border-royal" />
                  <input name="metricLabel" defaultValue={m.label} placeholder="AI Overview citations" className="rounded-lg border border-navy/15 bg-white px-2 py-2 text-sm text-navy outline-none focus:border-royal" />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-navy/10 bg-white p-6">
            <span className={label}>Cover image</span>
            <div className="mt-3">
              <CoverImageInput name="coverImage" defaultValue={cs?.coverImage} />
            </div>
          </section>

          <section className="rounded-2xl border border-navy/10 bg-white p-6">
            <label className="block">
              <span className={label}>Challenge (short, for list)</span>
              <textarea name="challenge" rows={2} defaultValue={cs?.challenge} className={input} />
            </label>
            <label className="mt-4 block">
              <span className={label}>Outcome (short, for list)</span>
              <textarea name="outcome" rows={2} defaultValue={cs?.outcome} className={input} />
            </label>
          </section>
        </aside>
      </form>

      {!isNew && (
        <form action={deleteCaseStudyAction} className="mt-6">
          <input type="hidden" name="slug" value={cs!.slug} />
          <button className="text-sm text-red-600 hover:underline">Delete this case study</button>
        </form>
      )}
    </div>
  );
}
