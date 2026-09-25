"use client";

import { useRef, useState } from "react";
import { Prose } from "@/components/Prose";

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/admin/api/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url as string;
}

export function MarkdownEditor({ name, defaultValue }: { name: string; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  function insertAtCursor(text: string) {
    const el = ref.current;
    if (!el) {
      setValue((v) => v + text);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = value.slice(0, start) + text + value.slice(end);
    setValue(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + text.length;
    });
  }

  function wrapSelection(before: string, after = before) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const sel = value.slice(start, end) || "text";
    const next = value.slice(0, start) + before + sel + after + value.slice(end);
    setValue(next);
    requestAnimationFrame(() => el.focus());
  }

  function prefixLine(prefix: string) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    setValue(next);
    requestAnimationFrame(() => el.focus());
  }

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadFile(file);
      insertAtCursor(`\n\n![${file.name.replace(/\.[^.]+$/, "")}](${url})\n\n`);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const btn =
    "rounded-md border border-navy/15 bg-white px-2.5 py-1 text-xs font-medium text-navy hover:border-royal/40";

  return (
    <div>
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap items-center gap-2 rounded-t-lg border border-b-0 border-navy/15 bg-gray-light px-3 py-2">
        <button type="button" className={btn} onClick={() => prefixLine("## ")}>H2</button>
        <button type="button" className={btn} onClick={() => prefixLine("### ")}>H3</button>
        <button type="button" className={btn} onClick={() => wrapSelection("**")}>Bold</button>
        <button type="button" className={btn} onClick={() => wrapSelection("*")}>Italic</button>
        <button type="button" className={btn} onClick={() => prefixLine("- ")}>List</button>
        <button type="button" className={btn} onClick={() => prefixLine("> ")}>Quote</button>
        <label className={`${btn} cursor-pointer`}>
          {busy ? "Uploading…" : "Insert image"}
          <input type="file" accept="image/*" className="sr-only" onChange={onPickImage} disabled={busy} />
        </label>
        <button
          type="button"
          className={`${btn} ml-auto ${preview ? "border-royal text-royal" : ""}`}
          onClick={() => setPreview((p) => !p)}
        >
          {preview ? "Edit" : "Preview"}
        </button>
      </div>
      {preview ? (
        <div className="min-h-[420px] rounded-b-lg border border-navy/15 bg-white p-6">
          {value.trim() ? <Prose>{value}</Prose> : <p className="text-sm text-navy/40">Nothing to preview yet.</p>}
        </div>
      ) : (
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={24}
          className="w-full rounded-b-lg border border-navy/15 bg-white px-4 py-3 font-mono text-[13px] leading-relaxed text-navy outline-none focus:border-royal"
          placeholder="Write in Markdown. Use the toolbar to add headings, lists and images."
        />
      )}
      <p className="mt-2 text-xs text-gray-dark">
        Markdown supported: <code>## Heading</code>, <code>**bold**</code>, <code>- list</code>, <code>![alt](url)</code>, tables.
      </p>
    </div>
  );
}

export function CoverImageInput({ name, defaultValue }: { name: string; defaultValue?: string | null }) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      setUrl(await uploadFile(file));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="Cover" className="h-20 w-32 rounded-lg border border-navy/10 object-cover" />
        ) : (
          <div className="flex h-20 w-32 items-center justify-center rounded-lg border border-dashed border-navy/20 text-xs text-navy/40">
            No image
          </div>
        )}
        <div className="flex items-center gap-3">
          <label className="cursor-pointer rounded-full border border-navy/15 px-4 py-2 text-sm font-medium text-navy hover:border-royal/40">
            {busy ? "Uploading…" : "Upload image"}
            <input type="file" accept="image/*" className="sr-only" onChange={onPick} disabled={busy} />
          </label>
          {url && (
            <button type="button" className="text-sm text-red-600 hover:underline" onClick={() => setUrl("")}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
