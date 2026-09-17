import Link from "next/link";
import { nav, site } from "@/lib/content";

const extra = [
  { label: "SEO + GEO", href: "/seo-geo" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="grid-texture-dark relative overflow-hidden border-t border-white/10 bg-navy px-6 py-20 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <div className="text-2xl font-bold tracking-tight">{site.name}</div>
          <p className="mt-3 text-sm text-white/60">{site.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div>
            <div className="eyebrow text-white/40">Navigate</div>
            <ul className="mt-4 space-y-3 text-sm">
              {nav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 hover:text-[var(--color-yellow)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/40">Resources</div>
            <ul className="mt-4 space-y-3 text-sm">
              {extra.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 hover:text-[var(--color-yellow)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/40">Connect</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-white/70 hover:text-[var(--color-yellow)]">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.twitter} target="_blank" rel="noreferrer" className="text-white/70 hover:text-[var(--color-yellow)]">
                  X / Twitter
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-white/70 hover:text-[var(--color-yellow)]">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} WRDS.PRO. All rights reserved.</span>
        <span className="font-mono">NARRATIVE INFRASTRUCTURE // BUILT FOR FOUNDERS</span>
      </div>
    </footer>
  );
}
