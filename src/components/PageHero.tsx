import { Reveal } from "@/components/Reveal";

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="grid-texture relative overflow-hidden px-6 pb-20 pt-40 md:pt-48">
      <div className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-royal/10 blur-[140px]" />
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="eyebrow text-royal">{eyebrow}</div>
          <h1 className="text-balance mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-navy md:text-7xl">
            {title}
          </h1>
          {body && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-dark">{body}</p>}
        </Reveal>
      </div>
    </section>
  );
}
