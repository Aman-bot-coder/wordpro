"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2.5"
      aria-live="polite"
      aria-label="WRDS Intelligence is thinking"
    >
      <div
        aria-hidden
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy/90 text-[9px] font-bold text-[var(--color-yellow)]"
      >
        W
      </div>
      <div className="glass flex items-center gap-2 rounded-2xl rounded-bl-sm px-4 py-3">
        <span className="eyebrow text-[10px] text-navy/50">WRDS Intelligence is thinking</span>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full bg-royal"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}
