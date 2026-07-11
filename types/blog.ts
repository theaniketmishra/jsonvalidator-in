export interface BlogContentBlock {
  type: "paragraph" | "heading" | "list" | "code" | "quote";
  text?: string;
  items?: string[];
  level?: 2 | 3;
  language?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** ISO date string */
  date: string;
  author: string;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  content: BlogContentBlock[];
}
