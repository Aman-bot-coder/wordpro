// Structured, local conversation engine for the WRDS Intelligence chatbot.
// No AI API involved — every question, response and route is defined here.

export type NodeId =
  | "howItWorks"
  | "narrativeInfrastructure"
  | "founderIP"
  | "linkedinAuthority"
  | "seoGeo"
  | "timeline"
  | "pricing"
  | "caseStudies"
  | "whyWrds";

export type ActionButton =
  | { kind: "question"; id: NodeId; label: string }
  | { kind: "route"; href: string; label: string }
  | { kind: "booking"; label: string };

export type ConversationNode = {
  id: NodeId;
  question: string;
  response: string[];
  actions: ActionButton[];
};

export const routes = {
  theSystem: "/the-system",
  caseStudies: "/case-studies",
  pricing: "/pricing",
  seoGeo: "/seo-geo",
  theWork: "/the-work",
  contact: "/contact",
};

export const nodes: Record<NodeId, ConversationNode> = {
  howItWorks: {
    id: "howItWorks",
    question: "How does WRDS work?",
    response: [
      "WRDS builds the infrastructure behind executive authority — from signal auditing and founder IP extraction to content, LinkedIn positioning and search visibility.",
      "The goal isn't simply to publish more. It's to make the right people understand what you know, why it matters and why you're worth listening to.",
    ],
    actions: [
      { kind: "route", href: routes.theSystem, label: "Explore The System" },
      { kind: "route", href: routes.caseStudies, label: "See Case Studies" },
      { kind: "booking", label: "Book an Authority Audit" },
    ],
  },
  narrativeInfrastructure: {
    id: "narrativeInfrastructure",
    question: "What is Narrative Infrastructure?",
    response: [
      "Narrative infrastructure is the system that turns a founder's expertise into a repeatable public narrative.",
      "It connects your ideas, positioning, content, search visibility and authority signals so your reputation compounds over time.",
    ],
    actions: [
      { kind: "route", href: routes.theSystem, label: "See The System" },
      { kind: "question", id: "howItWorks", label: "How does it work?" },
    ],
  },
  founderIP: {
    id: "founderIP",
    question: "What is Founder IP?",
    response: [
      "Founder IP is the proprietary thinking, frameworks, experiences and insights that make your perspective distinct.",
      "WRDS extracts that thinking and transforms it into intellectual assets that can be communicated consistently across your public presence.",
    ],
    actions: [
      { kind: "question", id: "narrativeInfrastructure", label: "Learn More" },
      { kind: "booking", label: "Book an Audit" },
    ],
  },
  linkedinAuthority: {
    id: "linkedinAuthority",
    question: "How does LinkedIn Authority work?",
    response: [
      "WRDS turns your LinkedIn presence into an extension of your executive positioning.",
      "The process combines strategic positioning, founder IP extraction, content architecture and consistent publishing to build a recognizable point of view.",
    ],
    actions: [
      { kind: "route", href: routes.theWork, label: "See The Work" },
      { kind: "route", href: routes.caseStudies, label: "View Case Studies" },
    ],
  },
  seoGeo: {
    id: "seoGeo",
    question: "What is SEO + GEO?",
    response: [
      "SEO helps people discover you through traditional search.",
      "GEO — Generative Engine Optimization — focuses on making your expertise more understandable and retrievable by AI-powered search and answer systems.",
      "Together, they help build discoverability beyond social feeds.",
    ],
    actions: [
      { kind: "question", id: "howItWorks", label: "How does WRDS work?" },
      { kind: "route", href: routes.caseStudies, label: "Show me case studies" },
      { kind: "booking", label: "Book an Authority Audit" },
    ],
  },
  timeline: {
    id: "timeline",
    question: "How long does it take?",
    response: [
      "WRDS follows a structured authority-building process.",
      "The early phase establishes your positioning and extracts your intellectual property. From there, the system moves into consistent publishing, visibility and compounding authority.",
    ],
    actions: [{ kind: "route", href: routes.theSystem, label: "See The Process" }],
  },
  pricing: {
    id: "pricing",
    question: "What does it cost?",
    response: [
      "WRDS currently offers three engagement levels:",
      "Foundation — $899/month\nAuthority — $1,999/month\nPartner — Custom",
      "Each level is designed around a different depth of authority-building support.",
    ],
    actions: [
      { kind: "route", href: routes.pricing, label: "Compare Plans" },
      { kind: "question", id: "howItWorks", label: "How does WRDS work?" },
      { kind: "booking", label: "Book an Authority Audit" },
    ],
  },
  caseStudies: {
    id: "caseStudies",
    question: "Show me case studies",
    response: [
      "Explore how WRDS has worked with founders and executives across areas including Industrial IoT, Family Office and AI/Product leadership.",
    ],
    actions: [{ kind: "route", href: routes.caseStudies, label: "View Case Studies" }],
  },
  whyWrds: {
    id: "whyWrds",
    question: "Why WRDS?",
    response: [
      "WRDS is built around executive authority rather than simply content production.",
      "The system connects positioning, founder IP, content, search visibility and narrative infrastructure into one strategy.",
    ],
    actions: [
      { kind: "route", href: routes.theSystem, label: "Explore The System" },
      { kind: "booking", label: "Book an Authority Audit" },
    ],
  },
};

export const rootSuggestions: ActionButton[] = [
  { kind: "question", id: "howItWorks", label: "How does WRDS work?" },
  { kind: "question", id: "narrativeInfrastructure", label: "What is Narrative Infrastructure?" },
  { kind: "question", id: "founderIP", label: "What is Founder IP?" },
  { kind: "question", id: "linkedinAuthority", label: "How does LinkedIn Authority work?" },
  { kind: "question", id: "seoGeo", label: "What is SEO + GEO?" },
  { kind: "question", id: "timeline", label: "How long does it take?" },
  { kind: "question", id: "pricing", label: "What does it cost?" },
  { kind: "question", id: "caseStudies", label: "Show me case studies" },
  { kind: "question", id: "whyWrds", label: "Why WRDS?" },
  { kind: "booking", label: "Book an Authority Audit" },
];

export const welcomeMessage = [
  "Hi. I'm the WRDS Intelligence guide.",
  "I can help you understand how WRDS builds executive authority, visibility and narrative infrastructure.",
  "What would you like to explore?",
];
