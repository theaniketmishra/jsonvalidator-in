import Link from "next/link";
import { Braces } from "lucide-react";
import { tools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { XIcon, RedditIcon } from "@/components/ui/social-icons";

const footerColumns = [
  {
    title: "Tools",
    links: [
      ...tools.slice(0, 8).map((t) => ({ href: `/${t.slug}`, label: t.name })),
      { href: "/#all-tools", label: "View all 32 tools →" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/what-is-json", label: "What is JSON? (Guide)" },
      { href: "/documentation", label: "Documentation" },
      { href: "/api", label: "API" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/#roadmap", label: "Roadmap" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Braces className="h-4.5 w-4.5" strokeWidth={2.5} />
            </span>
            {siteConfig.shortName}
            <span className="text-primary">.in</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{siteConfig.description}</p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.links.reddit}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="JSONValidator.in on Reddit"
              className="text-muted-foreground hover:text-foreground"
            >
              <RedditIcon className="h-4.5 w-4.5" />
            </a>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="JSONValidator.in on X (Twitter)"
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-sm font-semibold">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60 py-6">
        <div className="container flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
