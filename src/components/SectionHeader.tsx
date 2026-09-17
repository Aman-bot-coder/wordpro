export function SectionHeader({
  index,
  eyebrow,
  title,
  body,
  dark = false,
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  body?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div
        className={`eyebrow flex items-center gap-3 ${
          dark ? "text-[var(--color-yellow)]" : "text-royal"
        } ${align === "center" ? "justify-center" : ""}`}
      >
        {index && <span className="opacity-60">{index}</span>}
        <span>{eyebrow}</span>
      </div>
      <h2
        className={`text-balance mt-4 text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {body && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/70" : "text-gray-dark"}`}>
          {body}
        </p>
      )}
    </div>
  );
}
