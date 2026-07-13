"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Braces, ChevronDown, Menu, Search, X } from "lucide-react";
import { tools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils/cn";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/what-is-json", label: "JSON Guide" },
  { href: "/documentation", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [megaOpen, setMegaOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const filteredTools = React.useMemo(() => {
    if (!query.trim()) return tools;
    const q = query.toLowerCase();
    return tools.filter((t) => t.name.toLowerCase().includes(q) || t.keywords.some((k) => k.includes(q)));
  }, [query]);

  React.useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Braces className="h-4.5 w-4.5" strokeWidth={2.5} />
            </span>
            {siteConfig.shortName}
            <span className="text-primary">.in</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                aria-expanded={megaOpen}
                aria-haspopup="true"
              >
                Tools
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", megaOpen && "rotate-180")} />
              </button>

              {megaOpen && (
                <div className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-3">
                  <div className="glass grid grid-cols-3 gap-6 rounded-xl p-6 shadow-xl">
                    {(["core", "convert", "schema"] as const).map((cat) => {
                      const catTools = tools.filter((t) => t.category === cat);
                      const label = cat === "core" ? "Core tools" : cat === "convert" ? "Converters" : "Schema tools";
                      return (
                        <div key={cat} className="max-h-[70vh] overflow-y-auto">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            {label}
                          </p>
                          <ul className="space-y-0.5">
                            {catTools.map((tool) => (
                              <li key={tool.slug}>
                                <Link
                                  href={`/${tool.slug}`}
                                  className="flex items-center gap-1.5 truncate rounded-md px-2.5 py-1.5 text-sm hover:bg-muted"
                                  title={tool.name}
                                >
                                  {tool.name}
                                  {tool.isPro && (
                                    <span className="rounded-full bg-primary/15 px-1.5 py-0 text-[9px] font-bold uppercase text-primary">
                                      Pro
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filteredTools[0]) {
                  router.push(`/${filteredTools[0].slug}`);
                }
              }}
              placeholder="Search tools…"
              aria-label="Search tools"
              className="h-9 w-48 rounded-md border border-border bg-muted/40 pl-8 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {userEmail ? (
            <Link
              href="/account"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground sm:block"
            >
              Account
            </Link>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3.5 text-sm font-medium text-primary-foreground hover:brightness-110"
              >
                Sign up free
              </Link>
            </div>
          )}

          <ThemeToggle />
          <button
            className="rounded-md p-2 text-foreground md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="container flex max-h-[70vh] flex-col gap-1 overflow-y-auto py-4">
            {!userEmail && (
              <div className="mb-2 flex gap-2 px-2">
                <Link href="/login" className="flex-1 rounded-md border border-border py-2 text-center text-sm font-medium">
                  Log in
                </Link>
                <Link href="/signup" className="flex-1 rounded-md bg-primary py-2 text-center text-sm font-medium text-primary-foreground">
                  Sign up free
                </Link>
              </div>
            )}
            <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tools</p>
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/${tool.slug}`} className="flex items-center gap-1.5 rounded-md px-2 py-2 text-sm hover:bg-muted">
                {tool.name}
                {tool.isPro && (
                  <span className="rounded-full bg-primary/15 px-1.5 py-0 text-[9px] font-bold uppercase text-primary">
                    Pro
                  </span>
                )}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-md px-2 py-2 text-sm hover:bg-muted">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
