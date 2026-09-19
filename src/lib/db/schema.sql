-- WRDS.PRO dynamic SEO engine schema.
-- Applied by `npm run db:setup` (scripts/db-setup.ts). Safe to re-run.

CREATE TABLE IF NOT EXISTS seo_pages (
  id                 SERIAL PRIMARY KEY,
  path               TEXT NOT NULL UNIQUE,
  title              TEXT NOT NULL,
  description        TEXT NOT NULL DEFAULT '',
  focus_keyword      TEXT NOT NULL DEFAULT '',
  keywords           TEXT[] NOT NULL DEFAULT '{}',
  robots_index       BOOLEAN NOT NULL DEFAULT TRUE,
  robots_follow      BOOLEAN NOT NULL DEFAULT TRUE,
  canonical_override TEXT,
  og_title           TEXT,
  og_description     TEXT,
  og_image           TEXT,
  schema_types       TEXT[] NOT NULL DEFAULT '{}',
  breadcrumb         JSONB NOT NULL DEFAULT '[]'::jsonb,
  sitemap_priority   NUMERIC(2,1) NOT NULL DEFAULT 0.5,
  sitemap_changefreq TEXT NOT NULL DEFAULT 'monthly',
  sitemap_include    BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS seo_pages_path_idx ON seo_pages (path);

CREATE TABLE IF NOT EXISTS seo_redirects (
  id          SERIAL PRIMARY KEY,
  from_path   TEXT NOT NULL UNIQUE,
  to_path     TEXT NOT NULL,
  status_code INTEGER NOT NULL DEFAULT 301,
  enabled     BOOLEAN NOT NULL DEFAULT TRUE,
  hits        INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS seo_redirects_from_idx ON seo_redirects (from_path) WHERE enabled;

-- Single-row table holding site-wide SEO settings.
CREATE TABLE IF NOT EXISTS seo_settings (
  id                  INTEGER PRIMARY KEY DEFAULT 1,
  site_name           TEXT NOT NULL DEFAULT 'WRDS.PRO',
  base_url            TEXT NOT NULL DEFAULT 'https://wrds.pro',
  default_description TEXT NOT NULL DEFAULT '',
  title_template      TEXT NOT NULL DEFAULT '%s — WRDS.PRO',
  twitter_handle      TEXT NOT NULL DEFAULT '@Wrdspro',
  organization_email  TEXT NOT NULL DEFAULT 'hello@wrds.pro',
  social_profiles     TEXT[] NOT NULL DEFAULT '{}',
  google_verification TEXT,
  bing_verification   TEXT,
  robots_extra        TEXT NOT NULL DEFAULT '',
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT seo_settings_singleton CHECK (id = 1)
);

-- Audit history so scores can be tracked over time.
CREATE TABLE IF NOT EXISTS seo_audits (
  id         SERIAL PRIMARY KEY,
  path       TEXT NOT NULL,
  score      INTEGER NOT NULL,
  issues     JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS seo_audits_path_created_idx ON seo_audits (path, created_at DESC);
