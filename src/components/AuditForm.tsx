"use client";

import { useState } from "react";
import { site } from "@/lib/content";

export function AuditForm() {
  const [submitted, setSubmitted] = useState(false);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="glass grid gap-6 rounded-2xl p-10"
    >
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
      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-[var(--color-yellow)] px-7 py-4 text-sm font-semibold text-navy transition-colors hover:bg-[var(--color-yellow-bright)]"
      >
        Submit Application →
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
