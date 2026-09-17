"use client";

import { motion } from "framer-motion";

export function ChatMessage({
  role,
  lines,
}: {
  role: "user" | "assistant";
  lines: string[];
}) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {!isUser && (
        <div
          aria-hidden
          className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy/90 text-[9px] font-bold text-[var(--color-yellow)]"
        >
          W
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-royal text-white shadow-[0_4px_20px_rgba(20,92,255,0.25)]"
            : "glass rounded-bl-sm text-navy shadow-sm"
        }`}
      >
        {lines.map((line, i) => (
          <p key={i} className={i > 0 ? "mt-2 whitespace-pre-line" : "whitespace-pre-line"}>
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
