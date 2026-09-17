"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { FollowUpButton } from "./FollowUpButton";
import { BookingCTA } from "./BookingCTA";
import { ChatbotBackground } from "./ChatbotBackground";
import type { ActionButton } from "@/lib/chatbotData";

export type ChatEntry = {
  id: string;
  role: "user" | "assistant";
  lines: string[];
  isBooking?: boolean;
};

export function ChatWindow({
  entries,
  isTyping,
  actions,
  onSelectAction,
  onMinimize,
  onClose,
  onStartOver,
}: {
  entries: ChatEntry[];
  isTyping: boolean;
  actions: ActionButton[];
  onSelectAction: (action: ActionButton) => void;
  onMinimize: () => void;
  onClose: () => void;
  onStartOver: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [entries, isTyping]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      layoutId="wrds-chatbot-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ layout: { type: "spring", stiffness: 320, damping: 32, mass: 0.9 } }}
      role="dialog"
      aria-modal="false"
      aria-label="WRDS Intelligence chat"
      ref={dialogRef}
      tabIndex={-1}
      className="glass fixed bottom-4 right-4 z-[96] flex flex-col overflow-hidden rounded-[28px] border border-white/60 shadow-[0_20px_60px_rgba(7,26,61,0.25)] outline-none sm:bottom-6 sm:right-6"
      style={{
        width: "min(410px, calc(100vw - 24px))",
        height: "min(660px, calc(100vh - 100px), 74vh)",
        backdropFilter: "blur(30px)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(234,243,255,0.75) 100%)",
      }}
    >
      <ChatHeader onMinimize={onMinimize} onClose={onClose} />

      <div ref={scrollRef} className="relative flex-1 space-y-4 overflow-y-auto px-4 py-5">
        <ChatbotBackground />
        <div className="relative space-y-4">
          {entries.map((entry) =>
            entry.isBooking ? (
              <div key={entry.id} className="space-y-3">
                <ChatMessage role="assistant" lines={entry.lines} />
                <BookingCTA />
              </div>
            ) : (
              <ChatMessage key={entry.id} role={entry.role} lines={entry.lines} />
            )
          )}

          <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

          {!isTyping && actions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-2 pt-1"
            >
              {actions.map((action) => (
                <FollowUpButton
                  key={action.label}
                  label={action.label}
                  onClick={() => onSelectAction(action)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {entries.length > 1 && (
        <div className="border-t border-navy/10 bg-white/40 px-4 py-2.5 text-center">
          <button
            type="button"
            onClick={onStartOver}
            className="eyebrow text-[10px] text-navy/50 transition-colors hover:text-royal"
          >
            Start over
          </button>
        </div>
      )}
    </motion.div>
  );
}
