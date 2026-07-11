import type { Metadata } from "next";
import { ShieldCheck, Zap, Gauge } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${siteConfig.name} exists, and how it handles your data.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    icon: ShieldCheck,
    title: "Privacy by architecture",
    body: "Every tool runs entirely client-side. Your JSON is parsed, formatted, and repaired in your browser's own JavaScript engine — it's never sent to a server, logged, or stored.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    body: "No sign-up, no ads blocking the tool, no waiting on a network round-trip. Paste your JSON and get an answer immediately.",
  },
  {
    icon: Gauge,
    title: "Built to scale with you",
    body: "We're building out the rest of the JSON toolkit — converters, schema tools, diffing — on the same foundation: fast, accurate, and honest about what's actually implemented.",
  },
];

export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-16 sm:py-24">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">About {siteConfig.name}</h1>
      <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
        {siteConfig.name} is a focused toolkit for working with JSON: validating it, formatting it, and repairing it
        when it breaks. It&apos;s built the way we&apos;d want a developer tool to work — fast, free, and honest about what it
        does with your data.
      </p>

      <div className="mt-10 space-y-8">
        {principles.map((p) => (
          <div key={p.title} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <p.icon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold">{p.title}</h2>
              <p className="mt-1 leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
