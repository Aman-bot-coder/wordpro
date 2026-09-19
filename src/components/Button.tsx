"use client";

import Link from "next/link";
import { ReactNode, useRef, useState } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outlineLight" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  }

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 will-change-transform";
  const styles = {
    primary: "bg-[var(--color-yellow)] text-navy hover:bg-[var(--color-yellow-bright)]",
    secondary: "border border-navy/15 text-navy hover:border-navy/40",
    outlineLight: "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
    ghost: "text-white/90 hover:text-white",
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
        →
      </span>
    </Link>
  );
}
