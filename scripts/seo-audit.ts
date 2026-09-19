/**
 * Crawls the running site, scores every page with the shared analyzer and
 * prints a report. Exits non-zero if any page fails, so it can gate CI.
 *
 *   npm run dev                       (or: npm start)
 *   npm run seo:audit
 *   npm run seo:audit -- --url https://wrds.pro --save
 */
import { loadEnvConfig } from "@next/env";
import { analyze, type SeoAnalysis } from "../src/lib/seo/analyzer";
import { listPages, type SeoPage } from "../src/lib/seo/repository";

loadEnvConfig(process.cwd());

const args = process.argv.slice(2);
const urlFlag = args.indexOf("--url");
const BASE = (urlFlag > -1 ? args[urlFlag + 1] : process.env.AUDIT_URL ?? "http://localhost:3000").replace(/\/$/, "");
const SAVE = args.includes("--save");

function tag(html: string, re: RegExp): string {
  return html.match(re)?.[1]?.trim() ?? "";
}

function all(html: string, re: RegExp): string[] {
  return [...html.matchAll(re)].map((m) => m[1].trim());
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function bar(score: number): string {
  const filled = Math.round(score / 10);
  return "█".repeat(filled) + "░".repeat(10 - filled);
}

type Result = { path: string; analysis: SeoAnalysis; title: string; description: string };

async function auditPath(path: string, focusKeyword: string): Promise<Result | null> {
  const url = `${BASE}${path === "/" ? "" : path}`;
  let html: string;

  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) {
      console.error(`  ✗ ${path} — HTTP ${res.status}`);
      return null;
    }
    html = await res.text();
  } catch (error) {
    console.error(`  ✗ ${path} — ${(error as Error).message}`);
    return null;
  }

  const head = html.split("</head>")[0] ?? html;
  const body = html.slice(head.length);

  const title = tag(head, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = tag(head, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  const canonical = tag(head, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  const robotsMeta = tag(head, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i);
  const h1s = all(body, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map(stripTags);

  const images = all(body, /<img\b([^>]*)>/gi);
  const imagesMissingAlt = images.filter((attrs) => !/\balt=/.test(attrs)).length;
  const internalLinks = all(body, /<a[^>]+href="(\/[^"#][^"]*)"/gi).length;

  const analysis = analyze({
    path,
    title,
    description,
    focusKeyword,
    content: stripTags(body),
    h1: h1s,
    canonical: canonical || null,
    robotsIndex: !robotsMeta.includes("noindex"),
    hasSchema: /application\/ld\+json/.test(html),
    hasOgImage: /property="og:image"/.test(head),
    imagesMissingAlt,
    internalLinks,
  });

  return { path, analysis, title, description };
}

async function main() {
  console.log(`\nSEO audit — ${BASE}\n${"─".repeat(64)}`);

  const results: Result[] = [];
  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();

  const pages: SeoPage[] = await listPages();

  for (const entry of pages) {
    const result = await auditPath(entry.path, entry.focusKeyword);
    if (!result) continue;
    results.push(result);

    if (result.title) titles.set(result.title, [...(titles.get(result.title) ?? []), result.path]);
    if (result.description) {
      descriptions.set(result.description, [
        ...(descriptions.get(result.description) ?? []),
        result.path,
      ]);
    }
  }

  if (results.length === 0) {
    console.error("\nNo pages could be audited. Is the server running?\n");
    process.exit(1);
  }

  for (const { path, analysis } of results) {
    const fails = analysis.checks.filter((c) => c.status === "fail");
    const warns = analysis.checks.filter((c) => c.status === "warn");

    console.log(
      `\n${path.padEnd(18)} ${bar(analysis.score)} ${String(analysis.score).padStart(3)}/100  ${analysis.grade}`
    );
    for (const c of fails) console.log(`   ✗ ${c.label}: ${c.detail}`);
    for (const c of warns) console.log(`   ! ${c.label}: ${c.detail}`);
    if (fails.length === 0 && warns.length === 0) console.log("   ✓ all checks passing");
  }

  // Site-wide duplicate detection.
  console.log(`\n${"─".repeat(64)}`);
  const dupTitles = [...titles.entries()].filter(([, paths]) => paths.length > 1);
  const dupDescriptions = [...descriptions.entries()].filter(([, paths]) => paths.length > 1);
  for (const [title, paths] of dupTitles) console.log(`! Duplicate title "${title}" on ${paths.join(", ")}`);
  for (const [, paths] of dupDescriptions) console.log(`! Duplicate description on ${paths.join(", ")}`);

  const average = Math.round(results.reduce((s, r) => s + r.analysis.score, 0) / results.length);
  const failing = results.filter((r) => r.analysis.checks.some((c) => c.status === "fail"));

  console.log(`\nAverage score: ${average}/100 across ${results.length} pages`);
  console.log(`Pages with failures: ${failing.length}\n`);

  if (SAVE) {
    const { recordAudit } = await import("../src/lib/seo/repository");
    for (const { path, analysis } of results) {
      await recordAudit(path, analysis.score, analysis.checks.filter((c) => c.status !== "pass"));
    }
    console.log("Saved results to seo_audits.\n");
  }

  process.exit(failing.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
