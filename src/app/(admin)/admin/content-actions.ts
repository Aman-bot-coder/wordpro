"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import {
  deleteBlog,
  deleteCaseStudy,
  upsertBlog,
  upsertCaseStudy,
} from "@/lib/content-store";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

// ------------------------------- Blogs -------------------------------

export async function saveBlogAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  if (!slug || !title) redirect("/admin/blog?error=missing");

  await upsertBlog({
    slug,
    title,
    category: String(formData.get("category") ?? "").trim(),
    metaTitle: String(formData.get("metaTitle") ?? "").trim() || title,
    metaDescription: String(formData.get("metaDescription") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    coverImage: String(formData.get("coverImage") ?? "").trim() || null,
    body: String(formData.get("body") ?? ""),
    published: formData.get("published") === "on",
  });

  revalidatePath("/insights");
  revalidatePath(`/insights/${slug}`);
  revalidatePath("/sitemap.xml");
  redirect("/admin/blog?saved=" + encodeURIComponent(slug));
}

export async function deleteBlogAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const slug = String(formData.get("slug"));
  await deleteBlog(slug);
  revalidatePath("/insights");
  revalidatePath("/sitemap.xml");
  redirect("/admin/blog");
}

// ---------------------------- Case studies ----------------------------

export async function saveCaseStudyAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const client = String(formData.get("client") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "") || client || title);
  if (!slug || !client) redirect("/admin/case-studies?error=missing");

  // Metrics come as parallel value[]/label[] arrays.
  const values = formData.getAll("metricValue").map(String);
  const labels = formData.getAll("metricLabel").map(String);
  const metrics = values
    .map((value, i) => ({ value: value.trim(), label: (labels[i] ?? "").trim() }))
    .filter((m) => m.value || m.label);

  await upsertCaseStudy({
    slug,
    client,
    industry: String(formData.get("industry") ?? "").trim(),
    geo: String(formData.get("geo") ?? "").trim(),
    title: title || client,
    summary: String(formData.get("summary") ?? "").trim(),
    challenge: String(formData.get("challenge") ?? "").trim(),
    outcome: String(formData.get("outcome") ?? "").trim(),
    metrics,
    coverImage: String(formData.get("coverImage") ?? "").trim() || null,
    body: String(formData.get("body") ?? ""),
    published: formData.get("published") === "on",
  });

  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${slug}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  redirect("/admin/case-studies?saved=" + encodeURIComponent(slug));
}

export async function deleteCaseStudyAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const slug = String(formData.get("slug"));
  await deleteCaseStudy(slug);
  revalidatePath("/case-studies");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  redirect("/admin/case-studies");
}
