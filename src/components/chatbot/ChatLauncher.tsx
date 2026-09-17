"use client";

import { motion } from "framer-motion";

function IntelligenceIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <circle cx="13" cy="13" r="8.5" stroke="#145CFF" strokeWidth="1" opacity="0.35" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "13px 13px" }}
      >
        <circle cx="13" cy="4.7" r="1.15" fill="#2F80FF" />
        <circle cx="20.4" cy="17.2" r="1.15" fill="#145CFF" />
        <circle cx="5.6" cy="17.2" r="0.95" fill="#FFD43B" />
      </motion.g>
      <circle cx="13" cy="13" r="3.1" fill="#071A3D" />
      <circle cx="13" cy="13" r="1.3" fill="#FFD43B" />
    </svg>
  );
}

export function ChatLauncher({
  onClick,
  showHint,
  onDismissHint,
}: {
  onClick: () => void;
  showHint: boolean;
  onDismissHint: () => void;
}) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[95] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="glass pointer-events-auto flex max-w-[220px] items-start gap-2 rounded-2xl px-4 py-3 text-[12.5px] text-navy shadow-lg"
        >
          <span>Need help understanding the system?</span>
          <button
            type="button"
            onClick={onDismissHint}
            aria-label="Dismiss hint"
            className="shrink-0 text-navy/40 hover:text-navy"
          >
            ×
          </button>
        </motion.div>
      )}

      <motion.button
        type="button"
        onClick={onClick}
        aria-label="Open WRDS Intelligence chat"
        className="group pointer-events-auto relative flex h-16 w-16 items-center justify-center rounded-full"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
      >
        <svg className="absolute h-[88px] w-[88px] animate-[spin_16s_linear_infinite] opacity-40 group-hover:opacity-70" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <path id="wrds-orbit-path" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text fontSize="6.2" letterSpacing="2.5" fill="#145CFF" fontFamily="var(--font-mono-sans), monospace">
            <textPath href="#wrds-orbit-path">WRDS · INTELLIGENCE · </textPath>
          </text>
        </svg>

        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-royal/25 blur-lg transition-all duration-300 group-hover:bg-royal/40 group-hover:blur-xl"
        />
        <motion.span
          layoutId="wrds-chatbot-shell"
          transition={{ layout: { type: "spring", stiffness: 320, damping: 32, mass: 0.9 } }}
          className="glass relative flex h-16 w-16 items-center justify-center rounded-full border border-white/60 shadow-[0_8px_30px_rgba(20,92,255,0.25)]"
        >
          <IntelligenceIcon />
        </motion.span>

        <span className="pointer-events-none absolute -top-10 right-0 whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          Ask WRDS
        </span>
      </motion.button>
    </div>
  );
}
