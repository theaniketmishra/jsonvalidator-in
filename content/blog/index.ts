import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-json-beginners-guide",
    title: "JSON Explained: A Beginner's Guide With Real Examples",
    description:
      "New to JSON? Here's a plain-English introduction to what it is, what it looks like, and why it's everywhere in modern software — with real examples you can try yourself.",
    date: "2026-05-04",
    author: "JSONValidator.in Team",
    category: "Basics",
    tags: ["json", "beginners", "web development"],
    readingTimeMinutes: 6,
    content: [
      {
        type: "paragraph",
        text: "If you've spent any time around web development, you've run into JSON — even if nobody explained what it actually was. Maybe you opened your browser's dev tools and saw a wall of curly braces in the Network tab. Maybe you edited a package.json file without really knowing what made it \"json\". This guide is the explanation you probably wish someone had given you earlier.",
      },
      { type: "heading", level: 2, text: "So, what actually is JSON?" },
      {
        type: "paragraph",
        text: "JSON (JavaScript Object Notation) is just a way of writing down structured data as text. Think of it as a universal language for describing things like \"a user has a name, an age, and a list of hobbies\" in a format that any programming language can read and write. It looks like this:",
      },
      {
        type: "code",
        language: "json",
        text: '{\n  "name": "Priya",\n  "age": 29,\n  "hobbies": ["reading", "cycling", "chess"]\n}',
      },
      {
        type: "paragraph",
        text: "That's it. Curly braces for \"this is a set of named fields,\" square brackets for \"this is a list,\" quotes around text, and no quotes around numbers or true/false. Once that clicks, you can read almost any JSON document, no matter how deeply nested it gets.",
      },
      { type: "heading", level: 2, text: "Why does it matter so much?" },
      {
        type: "paragraph",
        text: "Before JSON became dominant, a lot of web APIs used XML, which wraps everything in opening and closing tags — much more typing, much more visual noise. JSON does the same job with far less ceremony, and because its syntax mirrors JavaScript's own object literals, it was trivial for web browsers to parse. That convenience is a big part of why, today, the overwhelming majority of web APIs speak JSON by default.",
      },
      {
        type: "paragraph",
        text: "It's not just APIs, either. Configuration files for tools you probably use every day — like package.json for Node.js projects, or tsconfig.json for TypeScript — are JSON. Databases like MongoDB store data in a JSON-like format natively. Even your browser's localStorage typically holds JSON strings.",
      },
      { type: "heading", level: 2, text: "Reading JSON: a quick mental model" },
      {
        type: "list",
        items: [
          "Curly braces { } mean \"an object\" — a set of labeled fields, like a small form.",
          "Square brackets [ ] mean \"a list\" — an ordered sequence of items.",
          "Everything to the left of a colon is a field name, always in double quotes.",
          "Everything to the right of a colon is the value — which can itself be another object or list, nested as deep as needed.",
        ],
      },
      {
        type: "paragraph",
        text: "Here's a slightly more realistic example — the kind of thing an e-commerce API might return for an order:",
      },
      {
        type: "code",
        language: "json",
        text: '{\n  "orderId": "ORD-88213",\n  "customer": {\n    "name": "Priya",\n    "email": "priya@example.com"\n  },\n  "items": [\n    { "sku": "MUG-01", "quantity": 2, "price": 249 },\n    { "sku": "TEE-14", "quantity": 1, "price": 899 }\n  ],\n  "isPaid": true,\n  "shippingAddress": null\n}',
      },
      {
        type: "paragraph",
        text: "Notice: an object nested inside an object (customer), a list of objects (items), a boolean (isPaid), and a null (shippingAddress hasn't been set yet). Those six building blocks — object, array, string, number, boolean, and null — are the entire vocabulary of JSON. There's nothing else to learn about its structure.",
      },
      { type: "heading", level: 2, text: "The mistakes almost everyone makes at first" },
      {
        type: "paragraph",
        text: "JSON's syntax is strict in a few specific ways that trip up beginners, usually because they look fine in JavaScript but aren't valid JSON:",
      },
      {
        type: "list",
        items: [
          "Using single quotes instead of double quotes around strings.",
          "Leaving a comma after the last item in a list or object (a \"trailing comma\").",
          "Forgetting to quote a field name.",
          "Adding a // comment, which JSON doesn't support at all.",
        ],
      },
      {
        type: "paragraph",
        text: "If you paste JSON somewhere and get a cryptic \"Unexpected token\" error, it's almost always one of these four things. Rather than hunting for it by eye, you can paste the document into a JSON Validator, which will point to the exact line and column and tell you what's wrong in plain language.",
      },
      { type: "heading", level: 2, text: "Where to go from here" },
      {
        type: "paragraph",
        text: "If you want the full reference — every data type, JSON versus XML and YAML, security considerations, and advanced concepts like JSON Schema — our complete What Is JSON guide covers all of it in depth. But if all you needed was to understand what you're looking at the next time you open a .json file, you now have everything you need.",
      },
    ],
  },
  {
    slug: "json-vs-xml-vs-yaml",
    title: "JSON vs XML vs YAML: Which Should You Use in 2026?",
    description:
      "A practical comparison of JSON, XML, and YAML — what each format is actually good at, where they fall short, and how to decide which one fits your next project.",
    date: "2026-05-11",
    author: "JSONValidator.in Team",
    category: "Comparisons",
    tags: ["json", "xml", "yaml", "data formats"],
    readingTimeMinutes: 8,
    content: [
      {
        type: "paragraph",
        text: "Every few months, someone on a team asks: \"should this config be JSON or YAML?\" or \"why does this API still use XML?\" The honest answer is that all three formats are still very much alive, because each one optimizes for something different. Here's how to actually decide, instead of just defaulting to whatever you used last time.",
      },
      { type: "heading", level: 2, text: "The short version" },
      {
        type: "list",
        items: [
          "JSON — the default for APIs and machine-to-machine data exchange. Compact, unambiguous, universally supported.",
          "YAML — the default for human-edited configuration. Reads almost like plain English, supports comments, but is whitespace-sensitive.",
          "XML — still common in enterprise, finance, and legacy systems. Verbose, but supports namespaces, attributes, and mature schema validation (XSD) that JSON and YAML don't natively match.",
        ],
      },
      { type: "heading", level: 2, text: "JSON: optimized for machines, tolerable for humans" },
      {
        type: "paragraph",
        text: "JSON was designed to map cleanly onto the data structures programming languages already have — objects, arrays, strings, numbers, booleans, null. That's exactly why it took over web APIs: a server can serialize its internal objects straight to JSON, and a client can deserialize that JSON straight back into native objects, with almost no translation layer in between.",
      },
      {
        type: "paragraph",
        text: "The trade-off is that JSON is strict and unforgiving to hand-edit. No comments, no trailing commas, mandatory double quotes on every key. That strictness is a feature for machine-generated data, but a mild annoyance for a human editing a config file by hand — which is exactly the gap YAML was built to fill.",
      },
      { type: "heading", level: 2, text: "YAML: optimized for humans, at the cost of ambiguity" },
      {
        type: "paragraph",
        text: "YAML strips away JSON's punctuation in favor of indentation, allows comments, and lets you skip quotes around most strings. It's genuinely pleasant to read and write by hand, which is why tools like Docker Compose, Kubernetes, GitHub Actions, and Ansible all standardized on it for configuration.",
      },
      {
        type: "paragraph",
        text: "The catch is YAML's implicit typing. The bare word \"no\" can be interpreted as the boolean false in some parsers (a long-running source of bugs known informally as the \"Norway problem,\" because the country code \"NO\" gets silently converted to false). Indentation errors can also silently change the meaning of a document rather than causing an obvious parse error, which makes bugs harder to spot. YAML is technically a superset of JSON's data model — any valid JSON document is also valid YAML — so you can mix the two when it's convenient.",
      },
      { type: "heading", level: 2, text: "XML: verbose, but still unmatched for certain jobs" },
      {
        type: "paragraph",
        text: "XML predates both JSON and YAML, and it shows in the syntax — every value is wrapped in an opening and closing tag, which roughly doubles the size of a document compared to the equivalent JSON. But XML has capabilities neither JSON nor YAML fully replicate out of the box: namespaces (so documents from different vocabularies can be combined safely), attributes as a distinct concept from element content, and XSD/DTD schemas with genuinely mature, widely implemented validation tooling.",
      },
      {
        type: "paragraph",
        text: "That's why XML persists in places like SOAP-based enterprise APIs, financial data interchange (SWIFT, FIX-adjacent formats), document formats (DOCX and ODT are technically ZIP archives full of XML), and older government or healthcare systems where the format was locked in years ago and the cost of migrating is high.",
      },
      { type: "heading", level: 2, text: "A practical decision guide" },
      {
        type: "list",
        items: [
          "Building a REST or GraphQL API? Use JSON. It's the expected default and every client library handles it natively.",
          "Writing a config file a human will edit directly? Use YAML, and consider validating it against a schema to catch the typing gotchas early.",
          "Integrating with an existing enterprise or legacy system? You may not get a choice — XML is often already the contract.",
          "Storing tabular data for a spreadsheet? None of the three — that's what CSV is for.",
        ],
      },
      { type: "heading", level: 2, text: "Converting between formats" },
      {
        type: "paragraph",
        text: "In practice, you'll often need to move data between these formats — pulling XML from a legacy system and turning it into JSON for a modern frontend, for example. Our JSON to XML converter handles exactly that direction for JSON-first workflows, and more converters (including YAML) are on the way.",
      },
    ],
  },

  {
    slug: "common-json-syntax-errors",
    title: "10 Common JSON Syntax Errors (And How to Fix Each One)",
    description:
      "Trailing commas, single quotes, unquoted keys, and more — a field guide to the JSON errors developers hit most often, with a before-and-after fix for each.",
    date: "2026-05-18",
    author: "JSONValidator.in Team",
    category: "Troubleshooting",
    tags: ["json", "debugging", "errors"],
    readingTimeMinutes: 7,
    content: [
      {
        type: "paragraph",
        text: "\"Unexpected token in JSON\" has to be one of the most common errors in web development, and one of the least helpful at telling you what's actually wrong. The good news: almost every JSON syntax error falls into one of about ten categories. Once you can recognize them on sight, you'll fix most JSON errors in seconds instead of minutes.",
      },
      { type: "heading", level: 2, text: "1. Trailing commas" },
      {
        type: "code",
        language: "json",
        text: '// Broken\n{ "a": 1, "b": 2, }\n\n// Fixed\n{ "a": 1, "b": 2 }',
      },
      {
        type: "paragraph",
        text: "JSON doesn't allow a comma after the last item in an object or array. This is the single most common JSON error, usually introduced when someone deletes the last field but forgets to delete the comma before it.",
      },
      { type: "heading", level: 2, text: "2. Single quotes instead of double quotes" },
      {
        type: "code",
        language: "json",
        text: "// Broken\n{ 'name': 'Priya' }\n\n// Fixed\n{ \"name\": \"Priya\" }",
      },
      {
        type: "paragraph",
        text: "Single quotes are valid in JavaScript object literals and in Python dictionaries, but JSON requires double quotes for every string and every key, with no exceptions.",
      },
      { type: "heading", level: 2, text: "3. Unquoted object keys" },
      {
        type: "code",
        language: "json",
        text: '// Broken\n{ name: "Priya" }\n\n// Fixed\n{ "name": "Priya" }',
      },
      {
        type: "paragraph",
        text: "This one is deceptive because it's completely valid JavaScript — JSON is stricter than JavaScript's own object literal syntax, and unquoted keys are one of the differences.",
      },
      { type: "heading", level: 2, text: "4. Missing commas between values" },
      {
        type: "code",
        language: "json",
        text: '// Broken\n{ "a": 1 "b": 2 }\n\n// Fixed\n{ "a": 1, "b": 2 }',
      },
      {
        type: "paragraph",
        text: "The opposite problem of #1 — forgetting to add a comma when a new field or array item was inserted. This often happens when merging changes from two sources by hand.",
      },
      { type: "heading", level: 2, text: "5. Comments" },
      {
        type: "code",
        language: "json",
        text: '// Broken\n{\n  "a": 1 // the answer\n}\n\n// Fixed\n{ "a": 1 }',
      },
      {
        type: "paragraph",
        text: "JSON has no comment syntax at all — not // and not /* */. If you need a self-documenting config format with comments, that's a strong argument for YAML instead, or for a JSON-with-comments variant like JSONC if your tooling supports it.",
      },
      { type: "heading", level: 2, text: "6. Unbalanced brackets or braces" },
      {
        type: "code",
        language: "json",
        text: '// Broken\n{ "a": [1, 2, 3 }\n\n// Fixed\n{ "a": [1, 2, 3] }',
      },
      {
        type: "paragraph",
        text: "A missing closing ] or } — often the result of copying a partial response from a log or a truncated network capture. The error message for this one is frequently \"Unexpected end of JSON input,\" since the parser runs out of document before it finds the closing bracket it expects.",
      },
      { type: "heading", level: 2, text: "7. Leading zeros in numbers" },
      {
        type: "code",
        language: "json",
        text: '// Broken\n{ "code": 007 }\n\n// Fixed\n{ "code": "007" }',
      },
      {
        type: "paragraph",
        text: "JSON numbers can't have leading zeros (except the number 0 itself). If you need to preserve a value like a zip code or an ID with leading zeros, store it as a string instead of a number.",
      },
      { type: "heading", level: 2, text: "8. NaN, Infinity, and undefined" },
      {
        type: "code",
        language: "json",
        text: '// Broken\n{ "score": NaN, "value": undefined }\n\n// Fixed\n{ "score": null, "value": null }',
      },
      {
        type: "paragraph",
        text: "These are valid JavaScript values but have no representation in JSON. The usual convention is to substitute null, or to omit the key entirely.",
      },
      { type: "heading", level: 2, text: "9. Duplicate keys" },
      {
        type: "code",
        language: "json",
        text: '// Ambiguous\n{ "id": 1, "id": 2 }\n\n// Fixed\n{ "id": 2 }',
      },
      {
        type: "paragraph",
        text: "Technically parseable — most parsers silently keep the last value — but duplicate keys are a strong signal of a bug somewhere upstream, since the JSON spec doesn't define which value should win.",
      },
      { type: "heading", level: 2, text: "10. Wrapping the whole document in quotes" },
      {
        type: "code",
        language: "json",
        text: '// Broken (this is a JSON string, not a JSON object)\n"{ \\"a\\": 1 }"\n\n// Fixed\n{ "a": 1 }',
      },
      {
        type: "paragraph",
        text: "This happens when JSON gets double-encoded — for example, when a JSON string is stringified a second time before being saved or logged. If you see escaped quotes (\\\") throughout what should be a plain object, look for a spot in your pipeline that's calling stringify twice.",
      },
      { type: "heading", level: 2, text: "The fastest way to fix all of these" },
      {
        type: "paragraph",
        text: "You don't have to spot these by eye. Paste broken JSON into our JSON Repair tool and it will automatically fix single quotes, unquoted keys, trailing and missing commas, comments, and unbalanced brackets — and show you a plain-language log of exactly what it changed and why.",
      },
    ],
  },
  {
    slug: "how-to-validate-json",
    title: "How to Validate JSON: A Complete Guide for Developers",
    description:
      "What JSON validation actually checks, how it differs from schema validation, and the fastest ways to validate JSON in your browser, your editor, and your codebase.",
    date: "2026-05-26",
    author: "JSONValidator.in Team",
    category: "Guides",
    tags: ["json", "validation", "developer tools"],
    readingTimeMinutes: 7,
    content: [
      {
        type: "paragraph",
        text: "\"Validate this JSON\" can mean two very different things depending on who's asking. Sometimes it means \"check that this is syntactically well-formed JSON\" — no stray commas, correctly quoted keys, balanced brackets. Other times it means \"check that this JSON has the fields and types my application expects.\" These are genuinely different problems solved by different tools, and mixing them up is a common source of confusion.",
      },
      { type: "heading", level: 2, text: "Syntax validation vs schema validation" },
      {
        type: "paragraph",
        text: "Syntax validation answers one question: can this text be parsed as JSON at all? It checks the document against the grammar defined in RFC 8259 — matching brackets, properly quoted strings, valid number formats, and so on. It has no opinion about what fields should exist or what type a given field should be.",
      },
      {
        type: "paragraph",
        text: "Schema validation is a layer on top of that: assuming the document is syntactically valid, does it match a specific structure? For example, does every user object have an email field, and is that field actually a string? This is what JSON Schema is for, and it requires you to write (or generate) a schema describing your expected shape first.",
      },
      {
        type: "paragraph",
        text: "In practice, you almost always want syntax validation first — there's no point checking field types on a document that doesn't even parse.",
      },
      { type: "heading", level: 2, text: "How syntax validation actually works under the hood" },
      {
        type: "paragraph",
        text: "A JSON parser reads a document character by character (or token by token), tracking which structure it's currently inside — an object, an array, a string, and so on. The moment it encounters a character that can't legally appear in that context — an unexpected comma, a missing quote, an unbalanced brace — it stops and reports an error, typically as a character offset into the original text. A good validator then converts that offset into a human-friendly line and column number, since almost nobody wants to count characters by hand.",
      },
      { type: "heading", level: 2, text: "Where to validate JSON" },
      {
        type: "list",
        items: [
          "In the browser, for a one-off check — paste into an online validator and get an instant answer with no setup.",
          "In your editor — most modern editors (VS Code, JetBrains IDEs) validate JSON files automatically as you type, often against a known schema for common files like package.json.",
          "In your codebase — wrap JSON.parse() (or your language's equivalent) in a try/catch and handle the error gracefully, rather than letting a malformed payload crash your application.",
          "In your CI pipeline — a linting step that validates every .json file in the repository catches malformed configuration before it ships.",
        ],
      },
      { type: "heading", level: 2, text: "What a good error message should tell you" },
      {
        type: "paragraph",
        text: "A genuinely useful validation error answers three questions: where is the problem (line and column, not just a byte offset), what specifically is wrong (not just \"unexpected token\" but which rule was broken), and — ideally — what to do about it. That's the philosophy behind our JSON Validator: paste your document, and if it's invalid, you get the exact line and column plus a plain-language explanation of the likely cause, not just the raw parser error message.",
      },
      { type: "heading", level: 2, text: "Validating large or streaming JSON" },
      {
        type: "paragraph",
        text: "For very large documents — multi-megabyte API dumps or log exports — validating the entire document at once can be slow or memory-intensive. In those cases, streaming validators that check the document incrementally, without loading the whole thing into memory, are worth reaching for. For most day-to-day validation, though, an in-browser tool handles documents up to several megabytes without any trouble.",
      },
      { type: "heading", level: 2, text: "Beyond validation: repairing broken JSON automatically" },
      {
        type: "paragraph",
        text: "Once you know your JSON is invalid, the next question is usually \"how do I fix it quickly?\" For the most common syntax mistakes — trailing commas, single quotes, unquoted keys — our JSON Repair tool can fix them automatically and show you exactly what it changed, rather than making you hunt for the broken character by hand.",
      },
    ],
  },
  {
    slug: "json-api-design-best-practices",
    title: "JSON API Design Best Practices: A Practical Checklist",
    description:
      "Casing conventions, date formats, pagination, error shapes, and versioning — a practical checklist for designing JSON APIs that are easy for other developers to consume.",
    date: "2026-06-02",
    author: "JSONValidator.in Team",
    category: "Best Practices",
    tags: ["json", "api design", "rest"],
    readingTimeMinutes: 8,
    content: [
      {
        type: "paragraph",
        text: "JSON gives you almost no structure by default — no required casing convention, no standard way to represent dates, no built-in pagination format. That flexibility is a double-edged sword: it's easy to start, but easy to end up with an API that's inconsistent and frustrating to consume. Here's a practical checklist we'd recommend running through before you ship a new JSON API.",
      },
      { type: "heading", level: 2, text: "1. Pick one casing convention and enforce it everywhere" },
      {
        type: "paragraph",
        text: "camelCase (userId) or snake_case (user_id) — either is fine, but mixing them within the same API is a constant source of small bugs for API consumers. If your backend language has a different native convention than your API (e.g. a Python backend using snake_case internally but exposing camelCase), decide on a consistent serialization layer rather than translating ad hoc in each endpoint.",
      },
      { type: "heading", level: 2, text: "2. Represent dates and times as ISO 8601 strings, in UTC" },
      {
        type: "code",
        language: "json",
        text: '{ "createdAt": "2026-06-02T14:30:00Z" }',
      },
      {
        type: "paragraph",
        text: "JSON has no native date type, so dates are always some kind of convention. ISO 8601 in UTC (with a trailing Z) is the closest thing to a universal standard, and every mainstream language can parse it without ambiguity. Avoid Unix timestamps unless your consumers specifically need them — they're not human-readable in logs or debugging tools.",
      },
      { type: "heading", level: 2, text: "3. Use null and missing keys deliberately, not interchangeably" },
      {
        type: "paragraph",
        text: "Decide what null means for your API — usually \"this field exists conceptually but has no value right now\" — versus omitting a key entirely, which usually means \"this field doesn't apply.\" Document the distinction and apply it consistently, since consumers will write code that branches on the difference.",
      },
      { type: "heading", level: 2, text: "4. Design a consistent pagination shape" },
      {
        type: "code",
        language: "json",
        text: '{\n  "data": [ /* ... */ ],\n  "pagination": {\n    "page": 2,\n    "pageSize": 25,\n    "totalItems": 134\n  }\n}',
      },
      {
        type: "paragraph",
        text: "Whatever shape you choose — page-based, cursor-based, or offset-based — use the same shape across every paginated endpoint. Inconsistent pagination is one of the most common complaints developers have about third-party APIs.",
      },
      { type: "heading", level: 2, text: "5. Standardize your error response shape" },
      {
        type: "code",
        language: "json",
        text: '{\n  "error": {\n    "code": "VALIDATION_ERROR",\n    "message": "Email is required.",\n    "field": "email"\n  }\n}',
      },
      {
        type: "paragraph",
        text: "A consistent error envelope — with a machine-readable code and a human-readable message — lets consumers write generic error handling instead of parsing free-text messages. Include enough detail to be actionable, but avoid leaking internal implementation details (stack traces, database errors) into the response.",
      },
      { type: "heading", level: 2, text: "6. Version your API deliberately" },
      {
        type: "paragraph",
        text: "Whether through a URL prefix (/v1/, /v2/), a header, or content negotiation, have an explicit versioning strategy before you need one. Adding new optional fields is usually safe without a version bump; removing or renaming fields, or changing a field's type, is a breaking change and should trigger a new version.",
      },
      { type: "heading", level: 2, text: "7. Keep nesting as flat as the data honestly allows" },
      {
        type: "paragraph",
        text: "Deep nesting mirrors your internal data model but makes life harder for consumers, who often just want a handful of fields from three levels down. Where it doesn't cost you correctness, consider flattening or providing a companion \"summary\" endpoint alongside a fully detailed one.",
      },
      { type: "heading", level: 2, text: "8. Document your shapes with JSON Schema" },
      {
        type: "paragraph",
        text: "A written description of your request and response shapes — ideally as an actual JSON Schema, not just prose — lets consumers validate what they send and receive programmatically, and lets you generate accurate client SDKs and documentation automatically.",
      },
      { type: "heading", level: 2, text: "Putting it into practice" },
      {
        type: "paragraph",
        text: "None of these rules require special tooling to follow — they're conventions your team agrees on and applies consistently. What tooling can help with is verification: validating that every response your API actually sends conforms to the shape you've documented. As we build out schema validation tools on this site, that verification step will get considerably easier to automate.",
      },
    ],
  },
];
