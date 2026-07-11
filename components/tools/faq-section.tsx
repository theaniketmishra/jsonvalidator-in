"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ToolFaq } from "@/types/tool";

export function FaqSection({ faqs }: { faqs: ToolFaq[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-card">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className="font-medium text-sm sm:text-base">{faq.question}</span>
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
              />
            </button>
            {open && (
              <div className="animate-fade-in px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
