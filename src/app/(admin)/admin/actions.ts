"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, destroySession, requireAdmin, verifyPassword } from "@/lib/auth";
import {
  deleteRedirect,
  saveRedirect,
  updateSettings,
  upsertPage,
  type SeoPage,
  type SeoSettings,
} from "@/lib/seo/repository";
import type { ChangeFrequency, SchemaType } from "@/lib/seo/config";

export async function loginAction(_prev: string | null, formData: FormData): Promise<string | null> {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) return "Incorrect password.";
  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

function parseKeywords(raw: string): string[] {
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

export async function savePageAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const path = String(formData.get("path"));
  const page: SeoPage = {
    path,
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    focusKeyword: String(formData.get("focusKeyword") ?? ""),
    keywords: parseKeywords(String(formData.get("keywords") ?? "")),
    robotsIndex: formData.get("robotsIndex") === "on",
    robotsFollow: formData.get("robotsFollow") === "on",
    canonicalOverride: String(formData.get("canonicalOverride") ?? "").trim() || null,
    ogTitle: String(formData.get("ogTitle") ?? "").trim() || null,
    ogDescription: String(formData.get("ogDescription") ?? "").trim() || null,
    ogImage: String(formData.get("ogImage") ?? "").trim() || null,
    schemaTypes: formData.getAll("schemaTypes").map(String) as SchemaType[],
    breadcrumb: JSON.parse(String(formData.get("breadcrumb") || "[]")),
    sitemapPriority: Number(formData.get("sitemapPriority") ?? 0.5),
    sitemapChangefreq: String(formData.get("sitemapChangefreq") ?? "monthly") as ChangeFrequency,
    sitemapInclude: formData.get("sitemapInclude") === "on",
    updatedAt: null,
  };

  await upsertPage(page);

  // Push the change live immediately rather than waiting for revalidation.
  revalidatePath(path);
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");
  revalidatePath("/admin");
  redirect("/admin?saved=" + encodeURIComponent(path));
}

export async function saveRedirectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  await saveRedirect({
    fromPath: String(formData.get("fromPath") ?? "").trim(),
    toPath: String(formData.get("toPath") ?? "").trim(),
    statusCode: Number(formData.get("statusCode") ?? 301),
    enabled: formData.get("enabled") === "on",
  });

  revalidatePath("/admin/redirects");
  redirect("/admin/redirects");
}

export async function deleteRedirectAction(formData: FormData): Promise<void> {
  await requireAdmin();
  await deleteRedirect(Number(formData.get("id")));
  revalidatePath("/admin/redirects");
  redirect("/admin/redirects");
}

export async function saveSettingsAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const settings: SeoSettings = {
    siteName: String(formData.get("siteName") ?? ""),
    baseUrl: String(formData.get("baseUrl") ?? "").replace(/\/$/, ""),
    defaultDescription: String(formData.get("defaultDescription") ?? ""),
    titleTemplate: String(formData.get("titleTemplate") ?? "%s"),
    twitterHandle: String(formData.get("twitterHandle") ?? ""),
    organizationEmail: String(formData.get("organizationEmail") ?? ""),
    socialProfiles: String(formData.get("socialProfiles") ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    googleVerification: String(formData.get("googleVerification") ?? "").trim() || null,
    bingVerification: String(formData.get("bingVerification") ?? "").trim() || null,
    robotsExtra: String(formData.get("robotsExtra") ?? ""),
  };

  await updateSettings(settings);

  revalidatePath("/", "layout");
  revalidatePath("/robots.txt");
  revalidatePath("/sitemap.xml");
  redirect("/admin/settings");
}
