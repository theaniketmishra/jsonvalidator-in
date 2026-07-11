import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// The wildcard rule below already allows every crawler, including AI
// bots — these named entries exist so the intent is explicit and can't be
// accidentally narrowed later by someone editing this file without
// realizing a broad "block scrapers" rule would also block AI assistants
// users rely on to answer questions using this site.
const AI_AND_SEARCH_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "Slurp", // Yahoo
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  "GPTBot", // OpenAI (training)
  "ChatGPT-User", // OpenAI (live browsing on a user's behalf)
  "OAI-SearchBot", // OpenAI search
  "ClaudeBot", // Anthropic
  "anthropic-ai", // Anthropic
  "Claude-User",
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Google's Gemini/AI training signal
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot", // Common Crawl (used as training data by many AI labs)
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AND_SEARCH_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
