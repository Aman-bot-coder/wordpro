"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/content";

export function BookingCTA() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    linkedin: "",
    goal: "",
  });

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // No standalone booking backend — this hands off to the site's real
    // Authority Audit page / calendar rather than inventing a new system.
    router.push("/contact");
  }

  const inputClass =
    "w-full rounded-lg border border-navy/15 bg-white/70 px-3 py-2 text-[13px] text-navy outline-none transition-colors focus:border-royal";

  return (
    <form onSubmit={submit} className="glass space-y-3 rounded-2xl rounded-bl-sm p-4">
      <label className="flex flex-col gap-1 text-[12px] font-medium text-navy">
        Name
        <input required value={form.name} onChange={update("name")} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-[12px] font-medium text-navy">
        Work Email
        <input
          required
          type="email"
          value={form.email}
          onChange={update("email")}
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-[12px] font-medium text-navy">
        Company
        <input required value={form.company} onChange={update("company")} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-[12px] font-medium text-navy">
        LinkedIn URL
        <input value={form.linkedin} onChange={update("linkedin")} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-[12px] font-medium text-navy">
        What are you trying to become known for?
        <textarea rows={2} value={form.goal} onChange={update("goal")} className={inputClass} />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-[var(--color-yellow)] px-5 py-2.5 text-[12.5px] font-semibold text-navy transition-colors hover:bg-[var(--color-yellow-bright)]"
      >
        Request Authority Audit →
      </button>
      <p className="text-center text-[10.5px] text-gray-dark">
        or{" "}
        <a href={site.booking} target="_blank" rel="noreferrer" className="text-royal underline">
          book directly on the calendar
        </a>
      </p>
    </form>
  );
}
