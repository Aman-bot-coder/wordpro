// Pure SEO scoring engine. No DOM, no DB, no Next imports — so it runs
// identically in the admin UI (live as you type) and in the CLI audit.

export type CheckStatus = "pass" | "warn" | "fail";

export type SeoCheck = {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
  /** Contribution to the 100-point score when passing. */
  weight: number;
};

export type SeoAnalysis = {
  score: number;
  grade: "excellent" | "good" | "needs work" | "poor";
  checks: SeoCheck[];
  passed: number;
  total: number;
};

export type AnalyzerInput = {
  path: string;
  title: string;
  description: string;
  focusKeyword: string;
  keywords?: string[];
  /** Visible page copy, tags stripped. Optional — content checks skip without it. */
  content?: string;
  h1?: string[];
  canonical?: string | null;
  robotsIndex?: boolean;
  hasSchema?: boolean;
  hasOgImage?: boolean;
  imagesMissingAlt?: number;
  internalLinks?: number;
};

export const TITLE_MIN = 30;
export const TITLE_MAX = 60;
export const DESC_MIN = 120;
export const DESC_MAX = 160;
const DENSITY_MIN = 0.4;
const DENSITY_MAX = 3.0;

function norm(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function includesKeyword(haystack: string, keyword: string): boolean {
  if (!keyword) return false;
  return norm(haystack).includes(norm(keyword));
}

export function keywordDensity(content: string, keyword: string): number {
  if (!content || !keyword) return 0;
  const words = norm(content).split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;
  const keywordWords = norm(keyword).split(/\s+/).filter(Boolean).length || 1;
  const occurrences = (norm(content).match(new RegExp(escapeRegex(norm(keyword)), "g")) ?? []).length;
  return (occurrences * keywordWords * 100) / words.length;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function wordCount(content: string): number {
  return norm(content).split(/\s+/).filter(Boolean).length;
}

export function analyze(input: AnalyzerInput): SeoAnalysis {
  const checks: SeoCheck[] = [];
  const add = (
    id: string,
    label: string,
    weight: number,
    status: CheckStatus,
    detail: string
  ) => checks.push({ id, label, weight, status, detail });

  // --- Focus keyword -------------------------------------------------------
  if (!input.focusKeyword) {
    add("focus-keyword", "Focus keyword set", 10, "fail", "No focus keyword defined.");
  } else {
    add("focus-keyword", "Focus keyword set", 10, "pass", `Focus keyword: “${input.focusKeyword}”.`);
  }

  // --- Title ---------------------------------------------------------------
  const titleLen = input.title.length;
  if (!input.title) {
    add("title-present", "Title present", 12, "fail", "Title is empty.");
  } else if (titleLen < TITLE_MIN) {
    add("title-present", "Title length", 12, "warn", `${titleLen} chars — short, aim for ${TITLE_MIN}–${TITLE_MAX}.`);
  } else if (titleLen > TITLE_MAX) {
    add("title-present", "Title length", 12, "warn", `${titleLen} chars — may be truncated in search results.`);
  } else {
    add("title-present", "Title length", 12, "pass", `${titleLen} chars — within ${TITLE_MIN}–${TITLE_MAX}.`);
  }

  add(
    "title-keyword",
    "Focus keyword in title",
    10,
    includesKeyword(input.title, input.focusKeyword) ? "pass" : "fail",
    includesKeyword(input.title, input.focusKeyword)
      ? "Focus keyword appears in the title."
      : "Focus keyword is missing from the title."
  );

  // --- Description ---------------------------------------------------------
  const descLen = input.description.length;
  if (!input.description) {
    add("desc-present", "Meta description present", 12, "fail", "Meta description is empty.");
  } else if (descLen < DESC_MIN) {
    add("desc-present", "Meta description length", 12, "warn", `${descLen} chars — short, aim for ${DESC_MIN}–${DESC_MAX}.`);
  } else if (descLen > DESC_MAX) {
    add("desc-present", "Meta description length", 12, "warn", `${descLen} chars — will be truncated.`);
  } else {
    add("desc-present", "Meta description length", 12, "pass", `${descLen} chars — within ${DESC_MIN}–${DESC_MAX}.`);
  }

  add(
    "desc-keyword",
    "Focus keyword in description",
    8,
    includesKeyword(input.description, input.focusKeyword) ? "pass" : "warn",
    includesKeyword(input.description, input.focusKeyword)
      ? "Focus keyword appears in the description."
      : "Focus keyword is missing from the meta description."
  );

  // --- URL -----------------------------------------------------------------
  const slug = input.path.replace(/\//g, " ").replace(/-/g, " ");
  const slugMatch = input.path === "/" || includesKeyword(slug, input.focusKeyword);
  add(
    "url-keyword",
    "Focus keyword in URL",
    6,
    slugMatch ? "pass" : "warn",
    slugMatch ? "URL reflects the focus keyword." : `URL “${input.path}” does not contain the focus keyword.`
  );

  // --- Headings ------------------------------------------------------------
  if (input.h1) {
    if (input.h1.length === 0) {
      add("h1-single", "Exactly one H1", 8, "fail", "No H1 found on the page.");
    } else if (input.h1.length > 1) {
      add("h1-single", "Exactly one H1", 8, "warn", `${input.h1.length} H1 tags found — use exactly one.`);
    } else {
      add("h1-single", "Exactly one H1", 8, "pass", "Exactly one H1 present.");
    }

    const h1Text = input.h1.join(" ");
    add(
      "h1-keyword",
      "Focus keyword in H1",
      8,
      includesKeyword(h1Text, input.focusKeyword) ? "pass" : "warn",
      includesKeyword(h1Text, input.focusKeyword)
        ? "Focus keyword appears in the H1."
        : "Focus keyword is missing from the H1."
    );
  }

  // --- Content -------------------------------------------------------------
  if (input.content) {
    const words = wordCount(input.content);
    add(
      "content-length",
      "Content length",
      6,
      words >= 300 ? "pass" : words >= 150 ? "warn" : "fail",
      `${words} words on the page.`
    );

    const density = keywordDensity(input.content, input.focusKeyword);
    const densityOk = density >= DENSITY_MIN && density <= DENSITY_MAX;
    add(
      "keyword-density",
      "Keyword density",
      6,
      densityOk ? "pass" : "warn",
      `${density.toFixed(2)}% — target ${DENSITY_MIN}–${DENSITY_MAX}%.`
    );

    const firstChunk = input.content.slice(0, Math.max(200, input.content.length * 0.1));
    add(
      "keyword-intro",
      "Keyword in opening content",
      4,
      includesKeyword(firstChunk, input.focusKeyword) ? "pass" : "warn",
      includesKeyword(firstChunk, input.focusKeyword)
        ? "Focus keyword appears early in the content."
        : "Focus keyword does not appear in the opening content."
    );
  }

  // --- Technical -----------------------------------------------------------
  add(
    "canonical",
    "Canonical URL",
    5,
    input.canonical ? "pass" : "fail",
    input.canonical ? `Canonical set to ${input.canonical}.` : "No canonical URL."
  );

  if (input.hasSchema !== undefined) {
    add(
      "schema",
      "Structured data",
      5,
      input.hasSchema ? "pass" : "warn",
      input.hasSchema ? "JSON-LD structured data present." : "No JSON-LD structured data found."
    );
  }

  if (input.hasOgImage !== undefined) {
    add(
      "og-image",
      "Social share image",
      4,
      input.hasOgImage ? "pass" : "warn",
      input.hasOgImage ? "Open Graph image present." : "No Open Graph image."
    );
  }

  if (input.imagesMissingAlt !== undefined) {
    add(
      "image-alt",
      "Image alt text",
      3,
      input.imagesMissingAlt === 0 ? "pass" : "warn",
      input.imagesMissingAlt === 0
        ? "All images have alt text."
        : `${input.imagesMissingAlt} image(s) missing alt text.`
    );
  }

  if (input.internalLinks !== undefined) {
    add(
      "internal-links",
      "Internal links",
      3,
      input.internalLinks >= 3 ? "pass" : input.internalLinks > 0 ? "warn" : "fail",
      `${input.internalLinks} internal link(s).`
    );
  }

  if (input.robotsIndex === false) {
    add("indexable", "Indexable", 0, "warn", "This page is set to noindex.");
  }

  // --- Score ---------------------------------------------------------------
  const scored = checks.filter((c) => c.weight > 0);
  const maxScore = scored.reduce((sum, c) => sum + c.weight, 0);
  const earned = scored.reduce((sum, c) => {
    if (c.status === "pass") return sum + c.weight;
    if (c.status === "warn") return sum + c.weight * 0.5;
    return sum;
  }, 0);

  const score = maxScore === 0 ? 0 : Math.round((earned / maxScore) * 100);

  return {
    score,
    grade: score >= 90 ? "excellent" : score >= 75 ? "good" : score >= 50 ? "needs work" : "poor",
    checks,
    passed: checks.filter((c) => c.status === "pass").length,
    total: checks.length,
  };
}
