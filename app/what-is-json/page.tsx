import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "What Is JSON? The Complete Guide (Beginner to Advanced)",
  description:
    "A complete guide to JSON: what it is, its syntax rules, data types, how it compares to XML and YAML, where it's used, common errors, security, JSON Schema, and advanced concepts like JSON Pointer and NDJSON.",
  alternates: { canonical: "/what-is-json" },
  keywords: [
    "what is json",
    "json syntax",
    "json data types",
    "json vs xml",
    "json vs yaml",
    "json tutorial",
    "json schema",
    "json security",
  ],
};

const toc = [
  { id: "what-is-json", label: "1. What is JSON?" },
  { id: "history", label: "2. A brief history of JSON" },
  { id: "syntax", label: "3. JSON syntax rules" },
  { id: "data-types", label: "4. JSON data types" },
  { id: "example", label: "5. A complete example, annotated" },
  { id: "comparison", label: "6. JSON vs XML vs YAML vs CSV" },
  { id: "where-used", label: "7. Where JSON is used" },
  { id: "validating", label: "8. How to validate JSON" },
  { id: "formatting", label: "9. How to format and minify JSON" },
  { id: "errors", label: "10. Common JSON errors and how to fix them" },
  { id: "languages", label: "11. Working with JSON in different languages" },
  { id: "schema", label: "12. JSON Schema: validating structure, not just syntax" },
  { id: "security", label: "13. Security considerations" },
  { id: "best-practices", label: "14. Best practices for designing JSON APIs" },
  { id: "advanced", label: "15. Advanced concepts" },
  { id: "conclusion", label: "16. Conclusion" },
];

export default function WhatIsJsonPage() {
  return (
    <div className="container max-w-3xl py-16 sm:py-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "What is JSON?", url: `${siteConfig.url}/what-is-json` },
        ])}
      />

      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        What Is JSON? The Complete Guide
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Everything from the absolute basics to advanced, production-level JSON concepts — syntax, data types,
        validation, security, and how JSON compares to XML, YAML, and CSV.
      </p>

      <nav aria-label="Table of contents" className="mt-8 rounded-xl border border-border p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</p>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-sm text-primary hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <article className="prose-content mt-10 space-y-12 leading-relaxed text-muted-foreground">
        <section id="what-is-json" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">1. What is JSON?</h2>
          <p className="mt-4">
            <strong className="text-foreground">JSON</strong> stands for <strong className="text-foreground">JavaScript Object Notation</strong>. It&apos;s a lightweight,
            text-based format for representing structured data — objects, arrays, strings, numbers, booleans, and
            null values — in a way that&apos;s easy for both humans to read and machines to parse. Despite the name,
            JSON is not tied to JavaScript: it&apos;s a language-independent data format with parsers and generators
            available in essentially every programming language in use today, from Python and Java to Rust and Go.
          </p>
          <p className="mt-4">
            At its core, JSON represents data as key-value pairs and ordered lists, nested as deeply as needed. If
            you&apos;ve ever seen a response from a web API, opened a modern configuration file, or inspected a NoSQL
            database document, you&apos;ve almost certainly seen JSON. It has become the de facto standard for exchanging
            data between a server and a web application, between microservices, and increasingly for configuration
            and data storage in general.
          </p>
          <p className="mt-4">
            JSON&apos;s popularity comes down to a simple trade-off: it captures nearly everything most applications need
            to represent structured data — nesting, lists, key-value maps, and a small set of primitive types —
            without the verbosity of formats like XML or the whitespace-sensitivity of formats like YAML.
          </p>
        </section>

        <section id="history" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">2. A brief history of JSON</h2>
          <p className="mt-4">
            JSON was derived from JavaScript&apos;s object literal syntax and popularized in the early 2000s by Douglas
            Crockford, who specified the format and registered the json.org website in 2001. Crockford didn&apos;t
            invent object literals — that syntax was already part of JavaScript — but he recognized that a strict
            subset of that syntax made an excellent, minimal data-interchange format, and gave it a name and a
            formal specification.
          </p>
          <p className="mt-4">
            JSON was later standardized as <strong className="text-foreground">RFC 8259</strong> (which obsoleted the
            earlier RFC 7159 and RFC 4627) by the Internet Engineering Task Force, and separately as{" "}
            <strong className="text-foreground">ECMA-404</strong> by Ecma International. Every JSON validator on the
            internet, including the one on this site, ultimately checks a document against the grammar defined in
            these specifications.
          </p>
        </section>

        <section id="syntax" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">3. JSON syntax rules</h2>
          <p className="mt-4">JSON&apos;s entire grammar fits on a single page. The rules that matter most in practice are:</p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>
              <strong className="text-foreground">Objects</strong> are wrapped in curly braces <code>{`{ }`}</code> and contain comma-separated
              <code> &quot;key&quot;: value</code> pairs.
            </li>
            <li>
              <strong className="text-foreground">Keys must always be double-quoted strings</strong> — single quotes and unquoted keys are not
              valid JSON, even though they&apos;re valid JavaScript.
            </li>
            <li>
              <strong className="text-foreground">Arrays</strong> are wrapped in square brackets <code>[ ]</code> and contain comma-separated values
              of any type, including mixed types.
            </li>
            <li>
              <strong className="text-foreground">Strings</strong> must use double quotes, never single quotes, and support standard escape
              sequences like <code>\n</code>, <code>\t</code>, and <code>\uXXXX</code> for Unicode characters.
            </li>
            <li>
              <strong className="text-foreground">No trailing commas</strong> are allowed after the last item in an object or array.
            </li>
            <li>
              <strong className="text-foreground">No comments</strong> — JSON has no syntax for <code>{"//"}</code> or <code>{"/* */"}</code> comments,
              which trips up many developers coming from JavaScript or C-like languages.
            </li>
            <li>
              <strong className="text-foreground">Numbers</strong> don&apos;t support leading zeros, hexadecimal notation, <code>NaN</code>, or{" "}
              <code>Infinity</code> — only standard decimal notation, with optional exponents.
            </li>
          </ul>
          <p className="mt-4">
            Every one of these rules is exactly what our{" "}
            <Link href="/" className="text-primary hover:underline">
              JSON Validator
            </Link>{" "}
            checks for, reporting the exact line and column of the first rule that&apos;s broken.
          </p>
        </section>

        <section id="data-types" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">4. JSON data types</h2>
          <p className="mt-4">JSON supports exactly six data types — no more, no less:</p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li><strong className="text-foreground">String</strong> — text wrapped in double quotes, e.g. <code>&quot;hello&quot;</code>.</li>
            <li><strong className="text-foreground">Number</strong> — integers or decimals, e.g. <code>42</code> or <code>3.14</code>. JSON does not distinguish integers from floats; that distinction is left to the parser in whichever language reads it.</li>
            <li><strong className="text-foreground">Boolean</strong> — <code>true</code> or <code>false</code>, always lowercase.</li>
            <li><strong className="text-foreground">Null</strong> — the literal <code>null</code>, representing an intentionally empty value.</li>
            <li><strong className="text-foreground">Object</strong> — an unordered set of key-value pairs, where values can be any JSON type, including nested objects.</li>
            <li><strong className="text-foreground">Array</strong> — an ordered list of values of any JSON type, including nested arrays and objects.</li>
          </ul>
          <p className="mt-4">
            Notably absent: dates, functions, undefined, and binary data. Dates are almost always represented as
            ISO 8601 strings (e.g. <code>&quot;2026-07-04T10:00:00Z&quot;</code>) by convention, not as a native type —
            it&apos;s up to your application to parse them.
          </p>
        </section>

        <section id="example" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">5. A complete example, annotated</h2>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-foreground/90">
{`{
  "id": 4471,                     // number
  "name": "Asha Verma",           // string
  "isActive": true,               // boolean
  "signupDate": "2024-03-11",     // string (dates are conventionally ISO 8601)
  "roles": ["admin", "editor"],   // array of strings
  "manager": null,                // null
  "address": {                    // nested object
    "city": "Pune",
    "pincode": "411001"
  }
}`}
          </pre>
          <p className="mt-4">
            (Note: real JSON cannot contain the <code>{"//"}</code> comments shown above — they&apos;re included here purely
            to annotate the example for this guide.)
          </p>
        </section>

        <section id="comparison" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">6. JSON vs XML vs YAML vs CSV</h2>
          <p className="mt-4">
            JSON isn&apos;t the only data-interchange format, and each of its main alternatives makes different trade-offs:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>
              <strong className="text-foreground">JSON vs XML</strong> — XML predates JSON and supports richer features like namespaces,
              attributes, and schema validation via XSD, but is far more verbose. JSON has largely replaced XML for
              web APIs because it&apos;s smaller, faster to parse, and maps directly onto native data structures in most
              programming languages.
            </li>
            <li>
              <strong className="text-foreground">JSON vs YAML</strong> — YAML is a superset of JSON&apos;s data model with a more human-friendly,
              indentation-based syntax and support for comments — popular for configuration files (like Docker
              Compose or Kubernetes manifests). The trade-off is that YAML&apos;s whitespace sensitivity and implicit
              typing (e.g. the string <code>&quot;no&quot;</code> can be silently parsed as boolean{" "}
              <code>false</code> in some parsers) make it more error-prone to hand-edit than JSON.
            </li>
            <li>
              <strong className="text-foreground">JSON vs CSV</strong> — CSV is a flat, tabular format ideal for spreadsheet-style data with a
              fixed set of columns. It has no native support for nesting, so representing hierarchical data in CSV
              requires flattening it — which is exactly what our{" "}
              <Link href="/json-to-csv" className="text-primary hover:underline">
                JSON to CSV converter
              </Link>{" "}
              does automatically.
            </li>
          </ul>
          <p className="mt-4">
            In short: reach for JSON for APIs and data interchange, YAML for human-edited configuration, XML when you
            need namespaces or you&apos;re integrating with legacy enterprise systems, and CSV when your data is
            genuinely tabular and destined for a spreadsheet.
          </p>
        </section>

        <section id="where-used" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">7. Where JSON is used</h2>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li><strong className="text-foreground">Web APIs</strong> — the overwhelming majority of REST and GraphQL APIs send and receive JSON.</li>
            <li><strong className="text-foreground">Configuration files</strong> — <code>package.json</code>, <code>tsconfig.json</code>, and countless other tool configs use JSON.</li>
            <li><strong className="text-foreground">NoSQL databases</strong> — document databases like MongoDB store records as JSON-like BSON documents natively.</li>
            <li><strong className="text-foreground">Browser storage</strong> — <code>localStorage</code> and <code>sessionStorage</code> commonly store serialized JSON.</li>
            <li><strong className="text-foreground">Mobile app data exchange</strong> — native iOS and Android apps parse JSON from backend services as their primary data format.</li>
            <li><strong className="text-foreground">Log files</strong> — structured logging tools increasingly emit one JSON object per line (see NDJSON in Section 15) for easy machine parsing.</li>
            <li><strong className="text-foreground">Infrastructure as code</strong> — tools like AWS CloudFormation support JSON templates alongside YAML.</li>
          </ul>
        </section>

        <section id="validating" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">8. How to validate JSON</h2>
          <p className="mt-4">
            Validating JSON means checking that a document follows the syntax rules in Section 3 — nothing more.
            A validator doesn&apos;t check whether the data makes sense for your application (that&apos;s what{" "}
            <Link href="#schema" className="text-primary hover:underline">
              JSON Schema
            </Link>{" "}
            is for) — only whether it&apos;s syntactically well-formed and can be parsed without error.
          </p>
          <p className="mt-4">
            The fastest way to validate JSON is to paste it into our{" "}
            <Link href="/" className="text-primary hover:underline">
              free online JSON Validator
            </Link>
            , which runs entirely in your browser and reports the exact line and column of any syntax error along
            with a plain-language explanation — no signup, and your data is never uploaded anywhere.
          </p>
        </section>

        <section id="formatting" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">9. How to format and minify JSON</h2>
          <p className="mt-4">
            JSON returned by an API is often minified — all on one line, with no spacing — to save bandwidth.
            That&apos;s great for machines but nearly unreadable for humans. <strong className="text-foreground">Formatting</strong> (also called{" "}
            <strong className="text-foreground">pretty-printing</strong>) adds consistent indentation and line breaks so nested structures are
            easy to scan, without changing the underlying data. The reverse operation, <strong className="text-foreground">minifying</strong>, strips
            all unnecessary whitespace to shrink the payload before sending it over the network.
          </p>
          <p className="mt-4">
            Our{" "}
            <Link href="/json-formatter" className="text-primary hover:underline">
              JSON Formatter
            </Link>{" "}
            does both — choose 2-space, 4-space, or tab indentation, or switch to Minify for a single compact line —
            and can optionally sort object keys alphabetically to make diffs easier to review.
          </p>
        </section>

        <section id="errors" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">10. Common JSON errors and how to fix them</h2>
          <p className="mt-4">The vast majority of &quot;invalid JSON&quot; errors come down to a small handful of mistakes:</p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li><strong className="text-foreground">Trailing commas</strong> — a comma left after the last item in an object or array, e.g. <code>{`{"a": 1,}`}</code>.</li>
            <li><strong className="text-foreground">Single-quoted strings</strong> — JSON requires double quotes; <code>{`{'a': 1}`}</code> is invalid.</li>
            <li><strong className="text-foreground">Unquoted keys</strong> — <code>{`{a: 1}`}</code> is valid JavaScript but invalid JSON; it must be <code>{`{"a": 1}`}</code>.</li>
            <li><strong className="text-foreground">Missing commas</strong> between elements or key-value pairs.</li>
            <li><strong className="text-foreground">Comments</strong> — JSON has no comment syntax, so any <code>{"//"}</code> or <code>{"/* */"}</code> will cause a parse error.</li>
            <li><strong className="text-foreground">Unbalanced brackets</strong> — a missing closing <code>{`}`}</code> or <code>]</code>, often from copy-pasting a partial response.</li>
          </ul>
          <p className="mt-4">
            Rather than fixing these by hand, our{" "}
            <Link href="/json-repair" className="text-primary hover:underline">
              JSON Repair tool
            </Link>{" "}
            detects and automatically corrects every one of these, and shows you a step-by-step log explaining
            exactly what it changed.
          </p>
        </section>

        <section id="languages" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">11. Working with JSON in different languages</h2>
          <p className="mt-4">Nearly every language has JSON support built into its standard library:</p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-foreground/90">
{`// JavaScript
const obj = JSON.parse('{"id": 1}');
const str = JSON.stringify(obj, null, 2);

# Python
import json
obj = json.loads('{"id": 1}')
text = json.dumps(obj, indent=2)

// Java (with Jackson)
ObjectMapper mapper = new ObjectMapper();
Map<String, Object> obj = mapper.readValue(json, Map.class);

// Go
var obj map[string]interface{}
json.Unmarshal([]byte(jsonStr), &obj)

// PHP
$obj = json_decode($jsonStr, true);
$str = json_encode($obj);`}
          </pre>
          <p className="mt-4">
            The pattern is the same everywhere: a <strong className="text-foreground">parse/decode</strong> function turns a JSON string into a
            native data structure, and a <strong className="text-foreground">stringify/encode</strong> function does the reverse.
          </p>
        </section>

        <section id="schema" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">12. JSON Schema: validating structure, not just syntax</h2>
          <p className="mt-4">
            Syntax validation only confirms a document is well-formed JSON — it says nothing about whether the data
            has the shape your application expects. <strong className="text-foreground">JSON Schema</strong> is a vocabulary for describing exactly
            that: which fields are required, what type each field must be, allowed value ranges, string patterns,
            and more. A JSON Schema is itself written in JSON, and tools like{" "}
            <a href="https://ajv.js.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              AJV
            </a>{" "}
            can validate a document against a schema at high speed.
          </p>
          <p className="mt-4">
            A dedicated JSON Schema Validator and Generator are on our roadmap — see{" "}
            <Link href="/#roadmap" className="text-primary hover:underline">
              what&apos;s coming next
            </Link>
            .
          </p>
        </section>

        <section id="security" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">13. Security considerations</h2>
          <p className="mt-4">
            JSON is generally safer to parse than formats that allow executable code, but a few practices matter:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>
              <strong className="text-foreground">Never use <code>eval()</code> to parse JSON.</strong> Because JSON is a subset of JavaScript syntax, it&apos;s
              tempting to parse it with <code>eval()</code> — but this executes arbitrary code and is a serious
              security risk if the JSON comes from an untrusted source. Always use <code>JSON.parse()</code> or your
              language&apos;s dedicated JSON parser.
            </li>
            <li>
              <strong className="text-foreground">Sanitize before rendering.</strong> If you render values from untrusted JSON into HTML, escape them
              properly to prevent cross-site scripting (XSS) — JSON itself doesn&apos;t protect against this.
            </li>
            <li>
              <strong className="text-foreground">Watch for prototype pollution.</strong> In JavaScript, naively merging untrusted JSON into an object
              can allow keys like <code>__proto__</code> to pollute the object prototype. Use safe merge utilities or
              validate keys when merging untrusted data.
            </li>
            <li>
              <strong className="text-foreground">Set size limits.</strong> APIs that accept JSON should enforce a maximum payload size to prevent
              denial-of-service attacks from extremely large or deeply nested documents.
            </li>
          </ul>
        </section>

        <section id="best-practices" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">14. Best practices for designing JSON APIs</h2>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>Use consistent casing for keys throughout your API — typically <code>camelCase</code> for JavaScript-facing APIs or <code>snake_case</code> for others, but pick one and stick to it.</li>
            <li>Represent dates as ISO 8601 strings, and always include a timezone or use UTC consistently.</li>
            <li>Avoid deeply nested structures where a flatter shape would do — deep nesting makes both parsing and querying harder.</li>
            <li>Use <code>null</code> deliberately to mean &quot;explicitly no value,&quot; and omit a key entirely when a field is simply not applicable.</li>
            <li>Version your API responses so structural changes don&apos;t silently break existing clients.</li>
            <li>Document your JSON shapes with a JSON Schema so consumers of your API know exactly what to expect.</li>
          </ul>
        </section>

        <section id="advanced" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">15. Advanced concepts</h2>
          <p className="mt-4">
            <strong className="text-foreground">JSON Pointer (RFC 6901)</strong> defines a string syntax, like{" "}
            <code>/address/city</code>, for referencing a specific value inside a JSON document — useful for error
            messages and partial updates.
          </p>
          <p className="mt-4">
            <strong className="text-foreground">JSON Patch (RFC 6902)</strong> builds on JSON Pointer to describe a sequence of operations
            (add, remove, replace, move, copy, test) that transform one JSON document into another — commonly used
            for efficient partial updates in REST APIs.
          </p>
          <p className="mt-4">
            <strong className="text-foreground">JSON Lines / NDJSON</strong> is a convention (not part of the JSON spec itself) where each line of a
            file is a complete, independent JSON value. It&apos;s popular for logs and streaming data because a consumer
            can process the file line by line without loading the whole thing into memory.
          </p>
          <p className="mt-4">
            <strong className="text-foreground">Streaming parsers</strong> — for JSON documents too large to load into memory at once, streaming
            (or &quot;SAX-style&quot;) parsers emit events as they encounter each token, rather than building the entire
            parsed structure up front.
          </p>
        </section>

        <section id="conclusion" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-foreground">16. Conclusion</h2>
          <p className="mt-4">
            JSON&apos;s staying power comes from being just complex enough to represent real-world structured data, and
            simple enough that a parser fits in a few hundred lines of code in any language. Whether you&apos;re
            debugging an API response, writing a configuration file, or designing a new service from scratch,
            understanding JSON&apos;s syntax rules, data types, and common pitfalls will save you time — and our{" "}
            <Link href="/" className="text-primary hover:underline">
              Validator
            </Link>
            ,{" "}
            <Link href="/json-formatter" className="text-primary hover:underline">
              Formatter
            </Link>
            ,{" "}
            <Link href="/json-repair" className="text-primary hover:underline">
              Repair
            </Link>
            , and{" "}
            <Link href="/json-viewer" className="text-primary hover:underline">
              Viewer
            </Link>{" "}
            tools are built to handle the mechanical parts so you can focus on your data.
          </p>
        </section>
      </article>
    </div>
  );
}
