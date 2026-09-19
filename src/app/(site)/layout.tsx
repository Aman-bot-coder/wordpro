import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WRDSChatbot } from "@/components/chatbot/WRDSChatbot";
import { JsonLd } from "@/components/JsonLd";
import { getSettings } from "@/lib/seo/repository";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(settings.baseUrl),
    title: {
      default: `${settings.siteName} — Narrative Infrastructure for Founders`,
      template: settings.titleTemplate,
    },
    description: settings.defaultDescription,
    applicationName: settings.siteName,
    authors: [{ name: settings.siteName, url: settings.baseUrl }],
    creator: settings.siteName,
    publisher: settings.siteName,
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Site-wide entity graph. Page-level schema is added by each page.
  const settings = await getSettings();
  const siteGraph = graph(organizationSchema(settings), websiteSchema(settings));

  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--color-black)]">
        <JsonLd data={siteGraph} />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <WRDSChatbot />
      </body>
    </html>
  );
}
