import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { ToolConfig } from "@/types/tool";

export function buildToolMetadata(tool: ToolConfig): Metadata {
  const url = `${siteConfig.url}/${tool.slug}`;

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
      images: [siteConfig.ogImage],
    },
  };
}
