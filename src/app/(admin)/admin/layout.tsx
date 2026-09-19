import Link from "next/link";
import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: "SEO Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const tabs = [
  { href: "/admin", label: "Pages" },
  { href: "/admin/redirects", label: "Redirects" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();

  // The login route renders its own shell.
  if (!authed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-light">
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <span className="text-sm font-bold tracking-tight text-navy">
              WRDS<span className="text-royal">.SEO</span>
            </span>
            <nav className="flex gap-6">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="text-sm font-medium text-navy/60 transition-colors hover:text-royal"
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-navy/50 hover:text-royal">
              View site ↗
            </Link>
            <form action={logoutAction}>
              <button className="rounded-full border border-navy/15 px-4 py-1.5 text-xs font-medium text-navy transition-colors hover:border-navy/40">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
