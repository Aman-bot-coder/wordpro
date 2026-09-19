"use client";

import { useMemo, useState } from "react";
import { analyze, DESC_MAX, DESC_MIN, TITLE_MAX, TITLE_MIN } from "@/lib/seo/analyzer";
import type { SeoPage } from "@/lib/seo/repository";
import { savePageAction } from "../actions";

const SCHEMA_OPTIONS = [
  "WebSite",
  "Organization",
  "Service",
  "Article",
  "FAQPage",
  "CollectionPage",
  "AboutPage",
  "ContactPage",
];

const CHANGEFREQ = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];

const input =
  "mt-2 w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-royal";
const label = "block text-sm font-medium text-navy";

function Counter({ value, min, max }: { value: number; min: number; max: number }) {
  const tone = value === 0 ? "text-navy/40" : value < min || value > max ? "text-amber-600" : "text-emerald-600";
  return (
    <span className={`text-xs font-medium ${tone}`}>
      {value} / {min}–{max}
    </span>
  );
}

export function PageEditor({ page, baseUrl }: { page: SeoPage; baseUrl: string }) {
  const [title, setTitle] = useState(page.title);
  const [description, setDescription] = useState(page.description);
  const [focusKeyword, setFocusKeyword] = useState(page.focusKeyword);
  const [keywords, setKeywords] = useState(page.keywords.join(", "));
  const [schemaTypes, setSchemaTypes] = useState<string[]>(page.schemaTypes);
  const [robotsIndex, setRobotsIndex] = useState(page.robotsIndex);

  const analysis = useMemo(
    () =>
      analyze({
        path: page.path,
        title,
        description,
        focusKeyword,
        keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
        canonical: page.canonicalOverride ?? page.path,
        robotsIndex,
        hasSchema: schemaTypes.length > 0,
      }),
    [page.path, page.canonicalOverride, title, description, focusKeyword, keywords, robotsIndex, schemaTypes]
  );

  const scoreTone =
    analysis.score >= 90
      ? "text-emerald-600"
      : analysis.score >= 75
      ? "text-royal"
      : analysis.score >= 50
      ? "text-amber-600"
      : "text-red-600";

  return (
    <form action={savePageAction} className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <input type="hidden" name="path" value={page.path} />
      <input type="hidden" name="breadcrumb" value={JSON.stringify(page.breadcrumb)} />

      {/* ------------------------------ Editor ------------------------------ */}
      <div className="space-y-6">
        <section className="rounded-2xl border border-navy/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy/50">Search appearance</h2>

          <label className="mt-5 block">
            <span className={label}>Focus keyword</span>
            <input
              name="focusKeyword"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              className={input}
              placeholder="e.g. narrative infrastructure"
            />
          </label>

          <label className="mt-5 block">
            <span className="flex items-center justify-between">
              <span className={label}>Title</span>
              <Counter value={title.length} min={TITLE_MIN} max={TITLE_MAX} />
            </span>
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className={input} />
          </label>

          <label className="mt-5 block">
            <span className="flex items-center justify-between">
              <span className={label}>Meta description</span>
              <Counter value={description.length} min={DESC_MIN} max={DESC_MAX} />
            </span>
            <textarea
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={input}
            />
          </label>

          <label className="mt-5 block">
            <span className={label}>Keywords (comma separated)</span>
            <input
              name="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className={input}
            />
          </label>
        </section>

        <section className="rounded-2xl border border-navy/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy/50">Social</h2>
          <label className="mt-5 block">
            <span className={label}>OG title (optional)</span>
            <input name="ogTitle" defaultValue={page.ogTitle ?? ""} className={input} />
          </label>
          <label className="mt-5 block">
            <span className={label}>OG description (optional)</span>
            <textarea name="ogDescription" rows={2} defaultValue={page.ogDescription ?? ""} className={input} />
          </label>
          <label className="mt-5 block">
            <span className={label}>OG image URL (optional)</span>
            <input name="ogImage" defaultValue={page.ogImage ?? ""} className={input} placeholder="/og/pricing.png" />
          </label>
        </section>

        <section className="rounded-2xl border border-navy/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy/50">Structured data</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SCHEMA_OPTIONS.map((type) => {
              const checked = schemaTypes.includes(type);
              return (
                <label
                  key={type}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    checked
                      ? "border-royal bg-royal/10 text-royal"
                      : "border-navy/15 text-navy/60 hover:border-navy/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="schemaTypes"
                    value={type}
                    checked={checked}
                    onChange={(e) =>
                      setSchemaTypes((prev) =>
                        e.target.checked ? [...prev, type] : prev.filter((t) => t !== type)
                      )
                    }
                    className="sr-only"
                  />
                  {type}
                </label>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-navy/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy/50">Indexing &amp; sitemap</h2>

          <div className="mt-5 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-navy">
              <input
                type="checkbox"
                name="robotsIndex"
                checked={robotsIndex}
                onChange={(e) => setRobotsIndex(e.target.checked)}
              />
              Index
            </label>
            <label className="flex items-center gap-2 text-sm text-navy">
              <input type="checkbox" name="robotsFollow" defaultChecked={page.robotsFollow} />
              Follow
            </label>
            <label className="flex items-center gap-2 text-sm text-navy">
              <input type="checkbox" name="sitemapInclude" defaultChecked={page.sitemapInclude} />
              In sitemap
            </label>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={label}>Sitemap priority</span>
              <input
                name="sitemapPriority"
                type="number"
                step="0.1"
                min="0"
                max="1"
                defaultValue={page.sitemapPriority}
                className={input}
              />
            </label>
            <label className="block">
              <span className={label}>Change frequency</span>
              <select name="sitemapChangefreq" defaultValue={page.sitemapChangefreq} className={input}>
                {CHANGEFREQ.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <span className={label}>Canonical override (optional)</span>
            <input
              name="canonicalOverride"
              defaultValue={page.canonicalOverride ?? ""}
              placeholder={`${baseUrl}${page.path}`}
              className={input}
            />
          </label>
        </section>

        <button
          type="submit"
          className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal"
        >
          Save changes
        </button>
      </div>

      {/* ----------------------------- Analysis ----------------------------- */}
      <aside className="space-y-6">
        <section className="rounded-2xl border border-navy/10 bg-white p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-navy/50">SEO score</h2>
            <span className={`text-3xl font-bold ${scoreTone}`}>{analysis.score}</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy/10">
            <div
              className={`h-full rounded-full transition-all ${
                analysis.score >= 75 ? "bg-emerald-500" : analysis.score >= 50 ? "bg-[var(--color-yellow)]" : "bg-red-500"
              }`}
              style={{ width: `${analysis.score}%` }}
            />
          </div>
          <p className="mt-2 text-xs capitalize text-gray-dark">
            {analysis.grade} · {analysis.passed}/{analysis.total} checks passing
          </p>
        </section>

        <section className="rounded-2xl border border-navy/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy/50">Google preview</h2>
          <div className="mt-4 rounded-lg border border-navy/10 p-4">
            <div className="text-xs text-emerald-700">
              {baseUrl.replace(/^https?:\/\//, "")}
              {page.path === "/" ? "" : page.path}
            </div>
            <div className="mt-1 text-[17px] leading-snug text-[#1a0dab]">
              {title.slice(0, TITLE_MAX) || "Untitled page"}
              {title.length > TITLE_MAX && "…"}
            </div>
            <div className="mt-1 text-[13px] leading-snug text-[#4d5156]">
              {description.slice(0, DESC_MAX) || "No meta description set."}
              {description.length > DESC_MAX && "…"}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-navy/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy/50">Checks</h2>
          <ul className="mt-4 space-y-3">
            {analysis.checks.map((check) => (
              <li key={check.id} className="flex gap-3 text-sm">
                <span
                  aria-hidden
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    check.status === "pass"
                      ? "bg-emerald-500"
                      : check.status === "warn"
                      ? "bg-[var(--color-yellow)]"
                      : "bg-red-500"
                  }`}
                />
                <span>
                  <span className="font-medium text-navy">{check.label}</span>
                  <span className="sr-only"> — {check.status}</span>
                  <span className="block text-xs text-gray-dark">{check.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </form>
  );
}
