"use client";

export function QuickQuestion({
  label,
  onClick,
  compact = false,
}: {
  label: string;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center justify-between gap-3 rounded-xl border border-navy/10 bg-white/60 text-left text-navy shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-royal/40 hover:bg-[var(--color-soft-blue)] hover:shadow-[0_6px_20px_rgba(20,92,255,0.15)] ${
        compact ? "px-3.5 py-2.5 text-[12.5px]" : "px-4 py-3 text-[13px]"
      }`}
    >
      <span className="font-medium">{label}</span>
      <span className="text-royal transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
        →
      </span>
    </button>
  );
}
