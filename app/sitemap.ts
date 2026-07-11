import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/what-is-json`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/documentation`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/api`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools
    .filter((tool) => tool.slug !== "json-validator") // canonical at "/"
    .map((tool) => ({
      url: `${siteConfig.url}/${tool.slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
