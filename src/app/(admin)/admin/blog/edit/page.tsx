import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getBlog } from "@/lib/content-store";
import { saveBlogAction, deleteBlogAction } from "../../content-actions";
import { MarkdownEditor, CoverImageInput } from "../../editor-widgets";

export const dynamic = "force-dynamic";

const input =
  "mt-2 w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-royal";
const label = "block text-sm font-medium text-navy";

export default async function BlogEdit({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { slug } = await searchParams;
  const post = slug ? await getBlog(slug) : null;
  const isNew = !post;

  return (
    <div>
      <Link href="/admin/blog" className="text-xs text-navy/50 hover:text-royal">← All posts</Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-navy">{isNew ? "New post" : post!.title}</h1>

      <form action={saveBlogAction} className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-navy/10 bg-white p-6">
            <label className="block">
              <span className={label}>Title</span>
              <input name="title" required defaultValue={post?.title} className={input} />
            </label>
            <label className="mt-5 block">
              <span className={label}>Body</span>
              <div className="mt-2">
                <MarkdownEditor name="body" defaultValue={post?.body} />
              </div>
            </label>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-navy/10 bg-white p-6">
            <label className="flex items-center gap-2 text-sm font-medium text-navy">
              <input type="checkbox" name="published" defaultChecked={post ? post.published : true} />
              Published
            </label>
            <label className="mt-5 block">
              <span className={label}>Slug (URL)</span>
              <input name="slug" defaultValue={post?.slug} placeholder="auto from title" className={input} />
            </label>
            <label className="mt-5 block">
              <span className={label}>Category</span>
              <input name="category" defaultValue={post?.category} placeholder="e.g. AI Discovery" className={input} />
            </label>
            <div className="mt-6 flex gap-3">
              <button className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-royal">Save</button>
            </div>
          </section>

          <section className="rounded-2xl border border-navy/10 bg-white p-6">
            <span className={label}>Cover image</span>
            <div className="mt-3">
              <CoverImageInput name="coverImage" defaultValue={post?.coverImage} />
            </div>
          </section>

          <section className="rounded-2xl border border-navy/10 bg-white p-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-navy/50">SEO</span>
            <label className="mt-4 block">
              <span className={label}>Excerpt</span>
              <textarea name="excerpt" rows={3} defaultValue={post?.excerpt} className={input} />
            </label>
            <label className="mt-4 block">
              <span className={label}>Meta title</span>
              <input name="metaTitle" defaultValue={post?.metaTitle} className={input} />
            </label>
            <label className="mt-4 block">
              <span className={label}>Meta description</span>
              <textarea name="metaDescription" rows={3} defaultValue={post?.metaDescription} className={input} />
            </label>
          </section>
        </aside>
      </form>

      {!isNew && (
        <form action={deleteBlogAction} className="mt-6">
          <input type="hidden" name="slug" value={post!.slug} />
          <button className="text-sm text-red-600 hover:underline">Delete this post</button>
        </form>
      )}
    </div>
  );
}
