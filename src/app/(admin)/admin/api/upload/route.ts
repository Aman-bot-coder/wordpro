import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { isAuthenticated } from "@/lib/auth";
import { extForType, uploadsDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

// Accepts a single image (multipart field "file"), stores it in the uploads
// directory and returns { url } pointing at the /media route.
export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "No file provided." }, { status: 400 });
  }

  const ext = extForType(file.type);
  if (!ext) {
    return Response.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.byteLength > MAX_BYTES) {
    return Response.json({ error: "File is larger than 8 MB." }, { status: 400 });
  }

  const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
  const dir = uploadsDir();
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, name), buffer);

  return Response.json({ url: `/media/${name}` });
}
