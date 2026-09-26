"use client";

import { useState } from "react";
import { site } from "@/lib/content";

export function AuditForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      linkedin: fd.get("linkedin"),
      challenge: fd.get("challenge"),
      goal: fd.get("goal"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <div className="eyebrow text-royal">Application Received</div>
        <p className="mt-4 text-lg text-navy">
          Thank you. We review every application personally — expect a reply within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass grid gap-6 rounded-2xl p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Company" name="company" required />
        <Field label="LinkedIn URL (optional)" name="linkedin" />
      </div>
      <Field
        label="What's your current authority challenge?"
        name="challenge"
        textarea
        required
      />
      <Field
        label="What business goal is this tied to? (fundraise, pipeline, hiring...)"
        name="goal"
        textarea
        required
      />
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="mt-2 w-full rounded-full bg-[var(--color-yellow)] px-7 py-4 text-sm font-semibold text-navy transition-colors hover:bg-[var(--color-yellow-bright)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending…" : "Submit Application →"}
      </button>
      <p className="text-center text-xs text-gray-dark">
        Prefer email? Reach us directly at{" "}
        <a href={`mailto:${site.email}`} className="text-royal underline">
          {site.email}
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base =
    "w-full rounded-lg border border-navy/15 bg-white/70 px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-royal";
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-navy sm:col-span-2 [&:has(input)]:sm:col-span-1">
      {label}
      {textarea ? (
        <textarea name={name} required={required} rows={3} className={base} />
      ) : (
        <input name={name} type={type} required={required} className={base} />
      )}
    </label>
  );
}
