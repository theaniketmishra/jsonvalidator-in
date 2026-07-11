export type ToolCategory = "core" | "convert" | "schema";

export interface ToolFeature {
  title: string;
  description: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

import type { PlanId } from "@/config/pricing";

export interface ToolConfig {
  slug: string;
  name: string;
  shortName: string;
  category: ToolCategory;
  tagline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  features: ToolFeature[];
  faqs: ToolFaq[];
  sampleInput: string;
  /** Whether the tool is fully implemented (vs. a roadmap placeholder). */
  isLive: boolean;
  /** Whether this tool requires an active subscription to use. Defaults to false (free). */
  isPro?: boolean;
  /** Minimum plan tier required, when isPro is true. Defaults to "starter". */
  proTier?: PlanId;
}
