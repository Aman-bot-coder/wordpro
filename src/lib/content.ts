// Source of truth for all wrds.pro business content, migrated verbatim
// in meaning from https://wrds.pro/. Do not invent claims, numbers, or names.

export const site = {
  name: "WRDS.PRO",
  tagline: "Elevating Executive Authority.",
  email: "hello@wrds.pro",
  linkedin: "https://linkedin.com/company/wrdspro/",
  twitter: "https://x.com/Wrdspro",
  booking: "https://wrdspro.zohobookings.in",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "The Work", href: "/the-work" },
  { label: "The System", href: "/the-system" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
];

export const hero = {
  eyebrow: "Narrative Infrastructure for Founders",
  headline: "Your investors Google you before every meeting.",
  sub: "wrds.pro builds narrative infrastructure that makes founders discoverable, credible and memorable across LinkedIn, Google and AI — human-written, always.",
  ctaPrimary: "Book Your Authority Audit",
  ctaSecondary: "Explore the System",
};

export const stats = [
  { value: "75%", label: "of B2B decision-makers say thought leadership prompted them to consider a product", source: "Edelman–LinkedIn, 2024" },
  { value: "86%", label: "of B2B buyers start with a pre-built shortlist from prior exposure", source: "LinkedIn & B2B Institute, 2025" },
  { value: "3 in 4", label: "B2B decision-makers trust founder thought leadership over product marketing", source: "Edelman–LinkedIn, 2024" },
  { value: "92%", label: "of B2B purchases go to a vendor already on the day-one list", source: "Forrester / WSJ B2B Survey" },
  { value: "58%", label: "of buyers have replaced Google with AI tools for vendor research", source: "Capgemini, 2025" },
  { value: "527%", label: "YoY growth in AI-referred web sessions, H1 2025", source: "Previsible AI Traffic Report" },
  { value: "40%", label: "increase in AI visibility from structured, well-cited content", source: "Princeton & IIT Delhi, 2024" },
];

export const costOfSilence = [
  {
    n: "01",
    title: "The Investor",
    line: "“Your last post was eight months ago.”",
    body: "A weak digital footprint costs the meeting before it starts. Diligence begins on LinkedIn and Google, not in the room.",
  },
  {
    n: "02",
    title: "The Customer",
    line: "They chose the louder competitor.",
    body: "Buyers default to the vendor already visible in their feed — not necessarily the better product.",
  },
  {
    n: "03",
    title: "The Hire",
    line: "The senior candidate passed.",
    body: "Top talent diligences leadership the same way investors do. Silence reads as uncertainty.",
  },
  {
    n: "04",
    title: "The Category",
    line: "Someone else became the reference point.",
    body: "Categories get owned by whoever shows up consistently — not by whoever built the better thing.",
  },
];

export const authorityStack = [
  {
    n: "01",
    title: "Signal Audit",
    body: "Authority mapping, competitive analysis and white-space identification across LinkedIn, Google and AI models.",
  },
  {
    n: "02",
    title: "IP Engine",
    body: "Extraction of the founder's actual thinking into named frameworks, points of view and proprietary language.",
  },
  {
    n: "03",
    title: "Intellectual Asset Class",
    body: "Monthly deployment of that IP across every discovery layer — content that compounds instead of expiring.",
  },
];

export const services = [
  {
    n: "01",
    title: "LinkedIn Authority",
    body: "Human-written thought leadership that builds executive brand before the first conversation ever happens.",
    deliverables: ["Weekly/monthly post cadence", "Voice-matched ghostwriting", "Engagement-ready framing, not vanity bait"],
  },
  {
    n: "02",
    title: "SEO & GEO Visibility",
    body: "Ranking on Google and being cited by AI models. Included in every plan, fully optimized from day one.",
    deliverables: ["Technical + on-page SEO", "Generative Engine Optimization (GEO)", "Structured, citation-ready content"],
  },
  {
    n: "03",
    title: "Founder IP Extraction",
    body: "Two deep-dive interviews to pull the frameworks and points of view already in the founder's head.",
    deliverables: ["Two 90-minute IP sessions", "Named frameworks and proprietary language", "A reusable IP library"],
  },
  {
    n: "04",
    title: "Content Strategy",
    body: "A calendar built on competitive intelligence and white-space — not a content mill guessing at topics.",
    deliverables: ["Monthly content calendar", "Competitive monitoring", "Channel-specific formats"],
  },
  {
    n: "05",
    title: "Executive Positioning",
    body: "A consistent point of view across every surface an investor, customer or candidate will check.",
    deliverables: ["Cross-channel narrative consistency", "Positioning against category noise", "Long-form authority pieces"],
  },
  {
    n: "06",
    title: "Thought Leadership",
    body: "Research-driven strategy consulting, not content operations — tied to fundraising, pipeline and hiring outcomes.",
    deliverables: ["Case studies and long-form articles", "Board-ready narrative material", "Quarterly strategy refresh"],
  },
  {
    n: "07",
    title: "Competitive Intelligence",
    body: "Continuous monitoring of who else is claiming the category, and where the white space still is.",
    deliverables: ["Competitor signal tracking", "White-space mapping", "Positioning recommendations"],
  },
  {
    n: "08",
    title: "Narrative Infrastructure",
    body: "The compounding system that ties all of the above together into a durable intellectual asset class.",
    deliverables: ["Integrated Signal Audit → IP Engine → Deployment", "Cross-platform discoverability", "Long-term authority compounding"],
  },
];

export const process = [
  { n: "01", phase: "Weeks 1–2", title: "Foundations", body: "Signal Audit and competitive intelligence across LinkedIn, Google and AI models." },
  { n: "02", phase: "Week 3", title: "Extraction", body: "IP extraction through two 90-minute deep-dive interviews with the founder." },
  { n: "03", phase: "Week 4", title: "First Output", body: "First content suite delivered, with one revision round." },
  { n: "04", phase: "Months 2–3", title: "Compounding", body: "Weekly content rhythm, performance iteration, strategy refinement." },
  { n: "05", phase: "Month 3+", title: "Authority", body: "The compounding phase — results accelerate as the intellectual asset class builds." },
];

export const caseStudies = [
  {
    slug: "series-a-industrial-iot-canada",
    client: "Series A Founder",
    industry: "Industrial IoT",
    geo: "Canada",
    challenge: "A technically strong founder with no digital footprint, invisible to investors doing pre-meeting diligence.",
    outcome: "Unsolicited investor introductions began arriving.",
    metrics: [
      { value: "1,008,221", label: "impressions" },
      { value: "+470.6%", label: "vs. prior quarter" },
      { value: "77,393", label: "single-post impressions (top 5 posts)" },
      { value: "29%", label: "senior-level followers" },
    ],
  },
  {
    slug: "executive-team-family-office-usa",
    client: "Executive Team",
    industry: "Family Office",
    geo: "USA · Seed–Series A",
    challenge: "A multi-founder leadership team with strong thinking but no consistent narrative across channels.",
    outcome: "Three family office introductions arrived from previously unknown readers.",
    metrics: [
      { value: "8,546", label: "total followers (+35% in 30 days)" },
      { value: "+1,248", label: "followers in 90 days" },
      { value: "441K", label: "weekly impressions (+38% over 90 days)" },
      { value: "19%", label: "enterprise-tier followers" },
    ],
  },
  {
    slug: "vp-product-full-stack-ai",
    client: "VP of Product",
    industry: "Full-Stack AI",
    geo: "USA + India",
    challenge: "A senior operator whose expertise wasn't visible to the market he needed to reach for hiring and enterprise sales.",
    outcome: "Two senior PMs applied inbound; an enterprise prospect shortened procurement by months.",
    metrics: [
      { value: "87,477", label: "peak weekly impressions" },
      { value: "70,186", label: "peak weekly unique reach" },
      { value: "1,174", label: "profile viewers (USA/India split)" },
    ],
  },
];

export const pricing = [
  {
    id: "foundation",
    name: "Foundation",
    price: "$899",
    period: "/month",
    tag: null,
    audience: "Early-stage, bootstrapped founders",
    features: [
      "2 LinkedIn posts (~300 words) monthly",
      "2 SEO blog articles (~1,000 words) monthly",
      "Initial strategy session and content calendar",
      "1 revision round per piece",
      "SEO & GEO visibility included",
      "3-month maintenance included",
    ],
  },
  {
    id: "authority",
    name: "Authority",
    price: "$1,999",
    period: "/month",
    tag: "Most Chosen",
    audience: "Startups and scaleups",
    features: [
      "5 LinkedIn posts (~300 words) monthly",
      "4 SEO blog articles (~1,200 words) monthly",
      "2 long-form LinkedIn articles (~2,000 words) monthly",
      "1 case study (~2,000 words) monthly",
      "Full strategy, monthly calendar, competitive monitoring",
      "Monthly strategy session + priority email support",
      "2 revision rounds per piece",
      "Advanced SEO & GEO included",
      "3-month maintenance included",
    ],
  },
  {
    id: "partner",
    name: "Partner",
    price: "Custom",
    period: "",
    tag: null,
    audience: "Funded B2B companies",
    features: [
      "Everything in Authority, plus unlimited content requests",
      "Dedicated senior strategist (bi-weekly or on-demand)",
      "Proposals, landing pages, whitepapers, board decks",
      "Unlimited revisions, 2–3 day turnaround",
      "Enterprise GEO and AI visibility management",
      "Multi-founder / partner access",
      "3-month maintenance included",
    ],
  },
];

export const roi = {
  annualAuthority: "$23,988",
  comparison: "Less than two months of a senior engineer's salary — covered by a single Series A conversion (avg. $3–12M) or one enterprise ACV (avg. $80–250K).",
  offer: "A complimentary SEO & GEO Audit ($900 standalone value) is included with Q2 2026 engagements.",
};

export const idealClient = {
  fit: [
    "Founders/C-suite at funded startups, Seed through Series B",
    "Genuine expertise, inconsistent publishing",
    "Within 12 months of a raise, building pipeline, or competing for talent",
    "Willing to invest two 90-minute IP sessions upfront, plus monthly 30-minute reviews",
  ],
  notFit: [
    "Looking for AI-generated content at scale",
    "Chasing viral hacks or growth tactics",
    "Unwilling to invest time in IP extraction",
    "Expecting instant results",
  ],
};

export const capacity = "8 founders accepted per quarter — by design. The constraint exists so every engagement gets senior strategist time and a dedicated human writer.";

export const faqs = [
  {
    q: "Will people know it's not me writing this?",
    a: "No. Every piece is built from your own frameworks, language and stories, extracted directly from you in the IP sessions. It reads as you because it comes from you — we architect and write it.",
  },
  {
    q: "How do you guarantee human-written content?",
    a: "Every piece is written by a senior human writer, not generated. We use AI tools only for research and structuring — never to draft the final voice.",
  },
  {
    q: "What is narrative infrastructure?",
    a: "The compounding system — Signal Audit, IP Engine, and monthly deployment — that turns a founder's thinking into a durable, discoverable intellectual asset class across LinkedIn, Google and AI.",
  },
  {
    q: "How much time does this require?",
    a: "Two 90-minute IP extraction sessions upfront, then a 30-minute strategy review each month. We handle everything else.",
  },
  {
    q: "What is GEO?",
    a: "Generative Engine Optimization — the practice of structuring content so AI models like ChatGPT and Gemini surface and cite it when answering relevant queries.",
  },
  {
    q: "What is included in SEO/GEO?",
    a: "Technical and on-page SEO, plus GEO-structured, citation-ready content, included in every plan from Foundation upward.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "ChatGPT produces generic, hollow content indistinguishable from every other AI-generated post. We extract your actual thinking and have senior human writers build it into content only you could have written.",
  },
  {
    q: "When can I expect results?",
    a: "The first content suite ships in week 4. Authority compounds from month 3 onward as the intellectual asset class builds.",
  },
  {
    q: "Do I need to be a good writer?",
    a: "No. You need to be a good thinker. We do the writing — your job is showing up for the two IP sessions and monthly reviews.",
  },
  {
    q: "What results can I expect?",
    a: "Outcomes tied to business goals — investor introductions, inbound pipeline, and stronger senior candidates — not vanity metrics like likes or impressions alone.",
  },
  {
    q: "Why only eight clients per quarter?",
    a: "Capacity is capped by design so every engagement gets senior strategist time and a dedicated human writer — not shared across a content mill.",
  },
  {
    q: "What is the difference between plans?",
    a: "Foundation covers early-stage founders with a lighter cadence. Authority adds long-form articles, case studies and deeper strategy. Partner is a fully custom, unlimited engagement for funded companies.",
  },
];

export const about = {
  positioning: "A strategy firm that happens to produce exceptional content.",
  body: [
    "wrds.pro exists because most founders build something remarkable and are never known for it. The gap between those two realities is exactly what we're built to close — permanently.",
    "We reject AI-generated content, content mills, and vanity-metric optimization. What we deliver instead is IP extracted from actual founder thinking, written by senior humans, tied to business outcomes: fundraising, pipeline, hiring.",
    "We accept eight founders per quarter. That constraint is deliberate — it's what lets every engagement get senior strategist time and a dedicated human writer instead of a rotating pool of freelancers.",
  ],
};

export const seoGeo = {
  intro: "Buyers no longer discover vendors the way they used to. Search has split into two systems — the one you know, and the one now deciding what AI recommends.",
  flow: ["Query", "Search", "Content", "Authority", "AI Retrieval", "Citation"],
  body: "58% of buyers have already replaced Google with AI tools for vendor research, and AI-referred web sessions grew 527% year-over-year in H1 2025. Structured, well-cited content increases AI visibility by 40%. SEO and GEO are no longer separate disciplines — they are the same discovery layer, and every wrds.pro plan is built for both.",
};

export const finalCta = {
  lines: ["Your thinking is the asset.", "Your narrative is the infrastructure.", "Build the authority before you need it."],
  cta: "Book Your Authority Audit →",
};

export const contact = {
  headline: "Build the authority before you need it.",
  cta: "Book Your 30-Minute Authority Audit",
};
