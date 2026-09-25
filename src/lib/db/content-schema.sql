-- Dynamic content (blogs + case studies) for the WordPress-style editor.
-- Applied by `npm run content:setup`. Safe to re-run.

CREATE TABLE IF NOT EXISTS blog_posts (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  slug             VARCHAR(255) NOT NULL UNIQUE,
  title            TEXT NOT NULL,
  category         VARCHAR(120) NOT NULL DEFAULT '',
  meta_title       TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  excerpt          TEXT NOT NULL,
  cover_image      VARCHAR(512) NULL,
  body             LONGTEXT NOT NULL,
  published        TINYINT(1) NOT NULL DEFAULT 1,
  sort_order       INT NOT NULL DEFAULT 0,
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS case_study_posts (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  slug             VARCHAR(255) NOT NULL UNIQUE,
  client           VARCHAR(255) NOT NULL,
  industry         VARCHAR(255) NOT NULL DEFAULT '',
  geo              VARCHAR(255) NOT NULL DEFAULT '',
  title            TEXT NOT NULL,
  summary          TEXT NOT NULL,
  challenge        TEXT NOT NULL,
  outcome          TEXT NOT NULL,
  metrics          JSON NOT NULL,
  cover_image      VARCHAR(512) NULL,
  body             LONGTEXT NOT NULL,
  published        TINYINT(1) NOT NULL DEFAULT 1,
  sort_order       INT NOT NULL DEFAULT 0,
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
