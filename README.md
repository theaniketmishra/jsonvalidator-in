# JSONValidator.in

A fast, privacy-first JSON toolkit built with Next.js (App Router), TypeScript, Tailwind CSS, and Monaco Editor.

## What's implemented in this pass

- **JSON Validator** (`/`, aliased at `/json-validator`) — live validation with exact line/column error reporting and plain-language hints.
- **JSON Formatter** (`/json-formatter`) — beautify/minify with 2-space, 4-space, tab, or minified output, plus optional key sorting.
- **JSON Repair** (`/json-repair`) — heuristic repair pipeline (single quotes, unquoted keys, trailing/missing commas, comments, unbalanced brackets) with a full, human-readable log of every fix applied.
- Shared design system, navbar with mega menu, footer, theme toggle (light/dark), toasts, SEO metadata + JSON-LD (WebSite, SoftwareApplication, FAQPage, BreadcrumbList), `sitemap.xml`, `robots.txt`.
- `/documentation`, `/api` (spec only, no backend yet), `/blog` (empty state), `/about`.

Every tool runs 100% client-side — nothing pasted into the editor is ever sent to a server.

## Roadmap (not yet built)

JSON Viewer, Tree View, Diff, Escape/Unescape, Sort Keys, Flatten/Unflatten, Search, Merge/Split, the full language converter suite (XML/CSV/YAML/TOML/SQL/TypeScript/Python/etc.), the JSON Schema toolkit, and the MDX blog engine. The folder structure (`features/`, `lib/json/`, `components/tools/`) is designed so each of these can be added as its own feature module reusing the existing editor, toolbar, and tool-page-shell components.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run typecheck
npm run lint
```

## Project structure

```
app/                  Next.js App Router routes
  json-formatter/
  json-repair/
  json-validator/     redirects to "/" (canonical)
  about/ documentation/ blog/ api/
  sitemap.ts robots.ts layout.tsx page.tsx globals.css
components/
  layout/             Navbar, Footer, ThemeToggle, ThemeProvider
  tools/              JsonEditor, EditorToolbar, StatsBar, FeatureGrid,
                       FaqSection, RelatedTools, RepairLog, ToolPageShell
  ui/                 Button, Card, Badge, Tabs, Toaster
  seo/                JsonLd
features/
  json-validator/      ValidatorWorkspace
  json-formatter/      FormatterWorkspace
  json-repair/         RepairWorkspace
hooks/                 create-json-store (Zustand), use-toast, use-file-actions
lib/
  json/                validate.ts format.ts repair.ts stats.ts types.ts — the JSON engine
  seo/                 schema.ts metadata.ts
  utils/               cn.ts
config/                site.ts tools.ts
types/                 tool.ts
```
