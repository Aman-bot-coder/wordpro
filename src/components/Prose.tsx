import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders article/case-study body markdown in the site's editorial style.
// Content is authored verbatim from source docs; this only styles it.
export function Prose({ children }: { children: string }) {
  return (
    <div className="prose-wrds">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h1 className="text-balance mt-12 text-4xl font-semibold leading-tight tracking-tight text-navy first:mt-0 md:text-5xl" {...props} />
          ),
          h2: (props) => (
            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-navy md:text-3xl" {...props} />
          ),
          h3: (props) => (
            <h3 className="mt-8 text-xl font-semibold text-navy" {...props} />
          ),
          p: (props) => <p className="mt-5 text-[17px] leading-relaxed text-gray-dark" {...props} />,
          ul: (props) => <ul className="mt-5 space-y-2 text-[17px] leading-relaxed text-gray-dark" {...props} />,
          ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-5 text-[17px] leading-relaxed text-gray-dark" {...props} />,
          li: (props) => (
            <li className="ml-1 flex gap-3 [&>ul]:mt-2 [&>ul]:w-full">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" aria-hidden />
              <span {...props} />
            </li>
          ),
          strong: (props) => <strong className="font-semibold text-navy" {...props} />,
          em: (props) => <em className="italic" {...props} />,
          a: (props) => <a className="text-royal underline underline-offset-2" {...props} />,
          img: (props) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="mt-8 w-full rounded-2xl border border-navy/10 shadow-sm"
              alt={props.alt ?? ""}
              {...props}
            />
          ),
          blockquote: (props) => (
            <blockquote className="mt-6 border-l-4 border-l-[var(--color-yellow)] bg-gray-light py-4 pl-6 pr-4 text-lg italic text-navy" {...props} />
          ),
          table: (props) => (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm text-gray-dark" {...props} />
            </div>
          ),
          th: (props) => (
            <th className="border border-navy/15 bg-gray-light px-4 py-3 text-left font-semibold text-navy" {...props} />
          ),
          td: (props) => <td className="border border-navy/10 px-4 py-3 align-top" {...props} />,
          hr: () => <hr className="mt-10 border-navy/10" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
