-- WRDS.PRO dynamic SEO engine schema (MySQL 8+).
-- Applied by `npm run db:setup` (scripts/db-setup.ts). Safe to re-run.
-- Array/object columns are stored as JSON.

CREATE TABLE IF NOT EXISTS seo_pages (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  path               VARCHAR(255) NOT NULL UNIQUE,
  title              TEXT NOT NULL,
  description        TEXT NOT NULL,
  focus_keyword      VARCHAR(255) NOT NULL DEFAULT '',
  keywords           JSON NOT NULL,
  robots_index       TINYINT(1) NOT NULL DEFAULT 1,
  robots_follow      TINYINT(1) NOT NULL DEFAULT 1,
  canonical_override VARCHAR(512) NULL,
  og_title           TEXT NULL,
  og_description     TEXT NULL,
  og_image           VARCHAR(512) NULL,
  schema_types       JSON NOT NULL,
  breadcrumb         JSON NOT NULL,
  sitemap_priority   DECIMAL(2,1) NOT NULL DEFAULT 0.5,
  sitemap_changefreq VARCHAR(20) NOT NULL DEFAULT 'monthly',
  sitemap_include    TINYINT(1) NOT NULL DEFAULT 1,
  updated_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS seo_redirects (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  from_path   VARCHAR(512) NOT NULL UNIQUE,
  to_path     VARCHAR(512) NOT NULL,
  status_code INT NOT NULL DEFAULT 301,
  enabled     TINYINT(1) NOT NULL DEFAULT 1,
  hits        INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Single-row table holding site-wide SEO settings.
CREATE TABLE IF NOT EXISTS seo_settings (
  id                  INT PRIMARY KEY DEFAULT 1,
  site_name           VARCHAR(255) NOT NULL DEFAULT 'WRDS.PRO',
  base_url            VARCHAR(255) NOT NULL DEFAULT 'https://wrds.pro',
  default_description TEXT NOT NULL,
  title_template      VARCHAR(255) NOT NULL DEFAULT '%s — WRDS.PRO',
  twitter_handle      VARCHAR(64) NOT NULL DEFAULT '@Wrdspro',
  organization_email  VARCHAR(255) NOT NULL DEFAULT 'hello@wrds.pro',
  social_profiles     JSON NOT NULL,
  google_verification VARCHAR(255) NULL,
  bing_verification   VARCHAR(255) NULL,
  robots_extra        TEXT NOT NULL,
  updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Audit history so scores can be tracked over time.
CREATE TABLE IF NOT EXISTS seo_audits (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  path       VARCHAR(255) NOT NULL,
  score      INT NOT NULL,
  issues     JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX seo_audits_path_created_idx (path, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
