import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "API",
  description: `Planned REST API for ${siteConfig.name} — validate, format, repair, and convert JSON programmatically.`,
  alternates: { canonical: "/api" },
};

const endpoints = [
  {
    method: "POST",
    path: "/v1/validate",
    summary: "Validate a JSON document and return the exact error location, if any.",
    body: `{ "json": "string" }`,
    response: `{ "valid": boolean, "error"?: { "message": string, "line": number, "column": number } }`,
  },
  {
    method: "POST",
    path: "/v1/format",
    summary: "Pretty-print or minify a JSON document.",
    body: `{ "json": "string", "indent": "2" | "4" | "tab" | "minified" }`,
    response: `{ "output": "string" }`,
  },
  {
    method: "POST",
    path: "/v1/repair",
    summary: "Attempt to automatically fix common JSON syntax errors.",
    body: `{ "json": "string" }`,
    response: `{ "success": boolean, "output": "string", "steps": Array<{ "label": string, "count": number }> }`,
  },
  {
    method: "POST",
    path: "/v1/convert",
    summary: "Convert JSON into another format (XML, CSV, YAML, TypeScript, and more).",
    body: `{ "json": "string", "target": "xml" | "csv" | "yaml" | "typescript" | "python" }`,
    response: `{ "output": "string" }`,
  },
];

export default function ApiPage() {
  return (
    <div className="container max-w-3xl py-16 sm:py-24">
      <Badge variant="outline">Planned — not yet live</Badge>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">API reference</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A REST API is planned so you can validate, format, repair, and convert JSON directly from your own
        applications and CI pipelines. The endpoints below describe the intended contract; none are live yet — every
        tool on the site today runs entirely client-side.
      </p>

      <div className="mt-10 space-y-6">
        {endpoints.map((endpoint) => (
          <div key={endpoint.path} className="rounded-xl border border-border p-5">
            <div className="flex items-center gap-2">
              <Badge className="font-mono">{endpoint.method}</Badge>
              <code className="font-mono text-sm">{endpoint.path}</code>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{endpoint.summary}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Request body</p>
                <pre className="mt-1.5 overflow-x-auto rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs">
                  {endpoint.body}
                </pre>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Response</p>
                <pre className="mt-1.5 overflow-x-auto rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs">
                  {endpoint.response}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
