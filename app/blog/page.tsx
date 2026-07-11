import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles on JSON, APIs, and developer tooling from the ${siteConfig.name} team.`,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="container max-w-4xl py-16 sm:py-24">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Deep dives on JSON, data formats, and developer tooling.
      </p>

      <div className="mt-14 flex flex-col items-center rounded-xl border border-dashed border-border py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Newspaper className="h-5 w-5 text-muted-foreground" />
        </span>
        <h2 className="mt-4 font-display text-lg font-semibold">The blog is warming up</h2>
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          We&apos;re writing the first posts now. Check back soon, or explore the tools in the meantime.
        </p>
      </div>
    </div>
  );
}
