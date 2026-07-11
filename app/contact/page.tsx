import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/features/contact/contact-form";
import { XIcon, RedditIcon } from "@/components/ui/social-icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${siteConfig.name} team — questions, feedback, and bug reports.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container max-w-3xl py-16 sm:py-24">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Contact us</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Found a bug, have a feature request, or just want to say hello? We&apos;d like to hear from you.
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-primary/40"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Mail className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{siteConfig.contactEmail}</p>
            </div>
          </a>
          <a
            href={siteConfig.links.reddit}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-primary/40"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <RedditIcon className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-medium">Reddit</p>
              <p className="text-sm text-muted-foreground">r/JSONValidators</p>
            </div>
          </a>
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-primary/40"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <XIcon className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-medium">X (Twitter)</p>
              <p className="text-sm text-muted-foreground">Follow for updates</p>
            </div>
          </a>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
