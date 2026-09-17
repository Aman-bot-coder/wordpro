"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-navy/5 py-3" : "border-b border-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-navy">
          {site.name}
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="eyebrow text-navy/70 transition-colors hover:text-royal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="eyebrow rounded-full bg-navy px-5 py-2.5 text-white transition-colors hover:bg-royal"
          >
            Book Authority Audit
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <span className="block h-[1.5px] w-6 bg-navy" />
          <span className="block h-[1.5px] w-6 bg-navy" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-navy px-6 py-6 text-white lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{site.name}</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-2xl">
                ×
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-3xl font-semibold tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="eyebrow mt-auto rounded-full bg-[var(--color-yellow)] px-6 py-4 text-center text-navy"
            >
              Book Authority Audit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
