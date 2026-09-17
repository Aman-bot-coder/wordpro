"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ChatLauncher } from "./ChatLauncher";
import { ChatWindow, type ChatEntry } from "./ChatWindow";
import { nodes, rootSuggestions, welcomeMessage, type ActionButton } from "@/lib/chatbotData";

const HINT_KEY = "wrds-chat-hint-dismissed";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `wrds-msg-${idCounter}`;
}

function welcomeEntries(): ChatEntry[] {
  return [{ id: nextId(), role: "assistant", lines: welcomeMessage }];
}

export function WRDSChatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [actions, setActions] = useState<ActionButton[]>(rootSuggestions);
  const [isTyping, setIsTyping] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasOpenedOnceRef = useRef(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(HINT_KEY) === "1";
    } catch {
      // sessionStorage unavailable — skip the hint rather than throw
    }
    if (dismissed) return;

    const delay = 5000 + Math.random() * 3000;
    const timer = setTimeout(() => {
      if (hasOpenedOnceRef.current) return;
      setShowHint(true);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => () => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
  }, []);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    try {
      sessionStorage.setItem(HINT_KEY, "1");
    } catch {
      // ignore
    }
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    setShowHint(false);
    hasOpenedOnceRef.current = true;
    if (!hasOpenedOnce) {
      setEntries(welcomeEntries());
      setActions(rootSuggestions);
      setHasOpenedOnce(true);
    }
  }, [hasOpenedOnce]);

  const close = useCallback(() => setIsOpen(false), []);

  const startOver = useCallback(() => {
    setEntries(welcomeEntries());
    setActions(rootSuggestions);
    setIsTyping(false);
  }, []);

  const handleSelectAction = useCallback(
    (action: ActionButton) => {
      if (action.kind === "route") {
        router.push(action.href);
        return;
      }

      if (action.kind === "booking") {
        setEntries((prev) => [...prev, { id: nextId(), role: "user", lines: [action.label] }]);
        setActions([]);
        setIsTyping(true);
        typingTimeout.current = setTimeout(() => {
          setIsTyping(false);
          setEntries((prev) => [
            ...prev,
            {
              id: nextId(),
              role: "assistant",
              lines: ["Let's get your authority audit started."],
              isBooking: true,
            },
          ]);
        }, 300 + Math.random() * 400);
        return;
      }

      // kind === "question"
      const node = nodes[action.id];
      setEntries((prev) => [...prev, { id: nextId(), role: "user", lines: [node.question] }]);
      setActions([]);
      setIsTyping(true);
      typingTimeout.current = setTimeout(() => {
        setIsTyping(false);
        setEntries((prev) => [...prev, { id: nextId(), role: "assistant", lines: node.response }]);
        setActions(node.actions);
      }, 300 + Math.random() * 400);
    },
    [router]
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <ChatWindow
          key="window"
          entries={entries}
          isTyping={isTyping}
          actions={actions}
          onSelectAction={handleSelectAction}
          onMinimize={close}
          onClose={close}
          onStartOver={startOver}
        />
      ) : (
        <ChatLauncher key="launcher" onClick={open} showHint={showHint} onDismissHint={dismissHint} />
      )}
    </AnimatePresence>
  );
}
