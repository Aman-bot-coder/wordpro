import { join } from "node:path";

// Directory where uploaded media is stored. Persist this across deploys on the
// VPS (it lives outside .next). Defaults to <cwd>/uploads.
export function uploadsDir(): string {
  return process.env.UPLOAD_DIR || join(process.cwd(), "uploads");
}

const EXT_BY_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
};

export function extForType(type: string): string | null {
  return EXT_BY_TYPE[type] ?? null;
}

const CONTENT_TYPE_BY_EXT: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  avif: "image/avif",
};

export function contentTypeForExt(ext: string): string {
  return CONTENT_TYPE_BY_EXT[ext.toLowerCase()] ?? "application/octet-stream";
}
