import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tools } from "@/config/tools";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Documentation",
  description: `Guides, examples, and best practices for every ${siteConfig.name} tool.`,
  alternates: { canonical: "/documentation" },
};

export default function DocumentationPage() {
  return (
    <div className="container max-w-4xl py-16 sm:py-24">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Documentation</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Overview, examples, and common errors for each tool. More in-depth guides are added as new tools ship.
      </p>

      <div className="mt-10 space-y-10">
        {tools.map((tool) => (
          <section key={tool.slug} className="rounded-xl border border-border p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">{tool.name}</h2>
              <Link
                href={`/${tool.slug}`}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Open tool <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Best practices
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
                  {tool.features.slice(0, 3).map((f) => (
                    <li key={f.title}>{f.description}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Common questions
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {tool.faqs.slice(0, 3).map((faq) => (
                    <li key={faq.question}>{faq.question}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Example input</h3>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 font-mono text-xs leading-relaxed">
                {tool.sampleInput}
              </pre>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
