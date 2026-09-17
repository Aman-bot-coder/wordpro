import { Button } from "@/components/Button";
import { finalCta } from "@/lib/content";

export function CTASection() {
  return (
    <section className="grid-texture-dark noise relative overflow-hidden bg-navy px-6 py-32 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal/20 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl">
        <div className="space-y-2">
          {finalCta.lines.map((line, i) => (
            <p
              key={line}
              className={`text-balance font-semibold tracking-tight ${
                i === 0
                  ? "text-4xl text-white md:text-6xl"
                  : i === 1
                  ? "text-4xl text-white/80 md:text-6xl"
                  : "text-xl text-[var(--color-yellow)] md:text-2xl"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="/contact">{finalCta.cta.replace(" →", "")}</Button>
        </div>
      </div>
    </section>
  );
}
