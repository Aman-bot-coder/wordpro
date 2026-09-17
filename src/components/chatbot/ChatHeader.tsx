"use client";

export function ChatHeader({
  onMinimize,
  onClose,
}: {
  onMinimize: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative flex items-center justify-between border-b border-navy/10 bg-white/40 px-5 py-4 backdrop-blur-md">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="eyebrow text-navy">WRDS Intelligence</h2>
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
        </div>
        <p className="mt-1 text-[11px] text-gray-dark">
          <span className="sr-only">Status: </span>Online · Your executive authority guide
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onMinimize}
          aria-label="Minimize chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-navy/60 transition-colors hover:bg-navy/5 hover:text-navy"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-navy/60 transition-colors hover:bg-navy/5 hover:text-navy"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
