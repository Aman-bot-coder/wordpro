import { readFile } from "node:fs/promises";
import { join, normalize, extname } from "node:path";
import { contentTypeForExt, uploadsDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";

// Serves uploaded media from the persistent uploads directory.
export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const rel = normalize(path.join("/")).replace(/^(\.\.[/\\])+/, "");
  if (rel.includes("..")) return new Response("Not found", { status: 404 });

  const abs = join(uploadsDir(), rel);
  try {
    const file = await readFile(abs);
    const ext = extname(abs).slice(1);
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": contentTypeForExt(ext),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
