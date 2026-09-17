import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WRDSChatbot } from "@/components/chatbot/WRDSChatbot";

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
  metadataBase: new URL("https://wrds.pro"),
  title: {
    default: "WRDS.PRO — Narrative Infrastructure for Founders",
    template: "%s — WRDS.PRO",
  },
  description:
    "wrds.pro builds narrative infrastructure that makes founders discoverable, credible and memorable across LinkedIn, Google and AI — human-written, always.",
  openGraph: {
    title: "WRDS.PRO — Narrative Infrastructure for Founders",
    description:
      "Your investors Google you before every meeting. wrds.pro builds the authority that shows up when they do.",
    url: "https://wrds.pro",
    siteName: "WRDS.PRO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WRDS.PRO — Narrative Infrastructure for Founders",
    description:
      "Human-written narrative infrastructure for founders — LinkedIn, SEO and GEO visibility built on real IP.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WRDS.PRO",
  url: "https://wrds.pro",
  description:
    "wrds.pro builds narrative infrastructure that makes founders discoverable, credible and memorable across LinkedIn, Google and AI.",
  sameAs: ["https://linkedin.com/company/wrdspro/", "https://x.com/Wrdspro"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--color-black)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <WRDSChatbot />
      </body>
    </html>
  );
}
