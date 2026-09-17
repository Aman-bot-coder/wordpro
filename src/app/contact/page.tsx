import { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AuditForm } from "@/components/AuditForm";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book Your Authority Audit",
  description: contact.headline,
};

export default function ContactPage() {
  return (
    <section className="grid-texture relative overflow-hidden px-6 pb-32 pt-40 md:pt-48">
      <div className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-royal/10 blur-[140px]" />
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <div className="eyebrow text-royal">Authority Audit</div>
            <h1 className="text-balance mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-navy md:text-6xl">
              {contact.headline}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-dark">
              A 30-minute conversation to map your current authority gap and whether wrds.pro is the right fit —
              not a sales call.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 space-y-3 text-sm text-gray-dark">
            <p>
              Prefer to book directly?{" "}
              <a href={site.booking} target="_blank" rel="noreferrer" className="text-royal underline">
                Schedule on Zoho Bookings →
              </a>
            </p>
            <p>Only eight founders are accepted per quarter.</p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <AuditForm />
        </Reveal>
      </div>
    </section>
  );
}
