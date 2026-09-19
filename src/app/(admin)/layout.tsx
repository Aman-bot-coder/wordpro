import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SEO Admin — WRDS.PRO",
  robots: { index: false, follow: false },
};

// Admin runs on its own root layout: no marketing nav, footer or chatbot.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-light text-[var(--color-black)]">{children}</body>
    </html>
  );
}
