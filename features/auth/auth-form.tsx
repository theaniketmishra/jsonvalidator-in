"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import type { AuthActionResult } from "@/app/(auth)/actions";

export function AuthForm({
  action,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<AuthActionResult>;
  submitLabel: string;
}) {
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) setError(result.error);
      // On success, the action itself redirects — nothing else to do here.
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 h-10 w-full rounded-md border border-border bg-muted/30 px-3 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="current-password"
          className="mt-1.5 h-10 w-full rounded-md border border-border bg-muted/30 px-3 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Please wait…" : submitLabel}
      </Button>
    </form>
  );
}
