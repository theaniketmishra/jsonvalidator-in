export const siteConfig = {
  name: "JSONValidator.in",
  shortName: "JSONValidator",
  title: "JSON Validator, Formatter & Repair — JSONValidator.in",
  description:
    "Validate, format, and repair JSON instantly in your browser. Free, fast, and privacy-friendly — nothing you paste is ever sent to a server.",
  url: "https://www.jsonvalidator.in",
  ogImage: "/og-image.png",
  keywords: [
    "json validator",
    "json formatter",
    "json repair",
    "json pretty print",
    "json minifier",
    "json linter",
    "validate json online",
    "fix broken json",
  ],
  links: {
    twitter: "https://x.com/JSONValidator",
    reddit: "https://www.reddit.com/r/JSONValidators/",
  },
  contactEmail: "aniketmishra@jsonvalidator.in",
  creator: "JSONValidator.in",
} as const;

export type SiteConfig = typeof siteConfig;
