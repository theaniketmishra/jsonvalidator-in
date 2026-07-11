"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "the website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border p-6">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 h-10 w-full rounded-md border border-border bg-muted/30 px-3 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 h-10 w-full rounded-md border border-border bg-muted/30 px-3 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full resize-none rounded-md border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
        />
      </div>
      <Button type="submit" className="w-full">
        <Send className="h-3.5 w-3.5" /> Send message
      </Button>
      <p className="text-xs text-muted-foreground">
        This opens your email app with the message pre-filled — we don&apos;t have a backend collecting form
        submissions.
      </p>
    </form>
  );
}
