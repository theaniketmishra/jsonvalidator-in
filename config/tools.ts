import type { ToolConfig, ToolCategory } from "@/types/tool";

const SAMPLE_VALID = `{
  "user": {
    "id": 1024,
    "name": "Asha Verma",
    "isActive": true,
    "roles": ["admin", "editor"],
    "address": {
      "city": "Pune",
      "pincode": "411001"
    },
    "lastLogin": null
  }
}`;

const SAMPLE_BROKEN = `{
  name: 'Asha Verma',
  "id": 1024,
  "isActive": true
  "roles": ["admin", "editor",],
  "address": {
    "city": "Pune"
    "pincode": "411001",
  },
}`;

export const tools: ToolConfig[] = [
  {
    slug: "json-validator",
    name: "JSON Validator",
    shortName: "Validator",
    category: "core",
    tagline: "Validate JSON instantly with exact error locations.",
    description:
      "Paste or upload JSON and get instant, precise feedback — the exact line, column, and reason for any syntax error, plus a plain-language explanation of how to fix it.",
    metaTitle: "JSON Validator — Validate JSON Online Free | JSONValidator.in",
    metaDescription:
      "Validate JSON online instantly. Get the exact line and column of syntax errors with plain-language explanations. Free, fast, and runs entirely in your browser.",
    keywords: ["json validator", "validate json online", "json syntax checker", "json linter"],
    sampleInput: SAMPLE_VALID,
    isLive: true,
    features: [
      {
        title: "Line-accurate errors",
        description: "Every syntax error is pinpointed to an exact line and column, not just a vague message.",
      },
      {
        title: "Plain-language explanations",
        description: "Errors are translated from cryptic parser output into a clear description of what's wrong.",
      },
      {
        title: "Handles large documents",
        description: "Validate deeply nested or multi-megabyte JSON without the tab freezing.",
      },
      {
        title: "100% client-side",
        description: "Your JSON never leaves your browser — nothing is uploaded to a server.",
      },
    ],
    faqs: [
      {
        question: "Is this JSON validator free to use?",
        answer: "Yes. The validator is completely free, with no signup and no limit on how many times you use it.",
      },
      {
        question: "Does my JSON get uploaded anywhere?",
        answer:
          "No. Validation runs entirely in your browser using the JavaScript engine's built-in JSON parser — your data never touches a server.",
      },
      {
        question: "What counts as valid JSON?",
        answer:
          "Valid JSON follows the JSON specification (RFC 8259): double-quoted keys and strings, no trailing commas, no comments, and only the value types object, array, string, number, boolean, and null.",
      },
      {
        question: "Can it validate against a JSON Schema?",
        answer:
          "Schema-aware validation is on the roadmap. Today the validator checks that your document is syntactically valid JSON.",
      },
    ],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortName: "Formatter",
    category: "core",
    tagline: "Beautify or minify JSON with your choice of indentation.",
    description:
      "Pretty-print messy or minified JSON into clean, readable output with 2-space, 4-space, or tab indentation — or compress it down to a single line for production.",
    metaTitle: "JSON Formatter — Beautify & Pretty Print JSON | JSONValidator.in",
    metaDescription:
      "Format and beautify JSON online with 2-space, 4-space, or tab indentation. Minify JSON for production. Free, instant, and runs entirely in your browser.",
    keywords: ["json formatter", "json beautifier", "json pretty print", "format json online"],
    sampleInput: SAMPLE_VALID.replace(/\n\s*/g, " "),
    isLive: true,
    features: [
      {
        title: "Flexible indentation",
        description: "Choose 2 spaces, 4 spaces, or tabs — or minify to a single compact line.",
      },
      {
        title: "Preserves key order",
        description: "Formatting only changes whitespace; your object key order is never altered.",
      },
      {
        title: "One-click minify",
        description: "Strip all whitespace for the smallest possible payload before shipping to production.",
      },
      {
        title: "Sort keys alphabetically",
        description: "Optionally normalize object key order to make diffs and comparisons easier.",
      },
      {
        title: "Load JSON from a URL",
        description: "Fetch and format JSON directly from an API endpoint or public URL, no download required.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between formatting and minifying?",
        answer:
          "Formatting adds indentation and line breaks so JSON is easy for humans to read. Minifying removes all unnecessary whitespace to make the payload as small as possible for transmission.",
      },
      {
        question: "Does formatting change the data?",
        answer:
          "No. Only whitespace changes — the underlying values, types, and key order remain exactly as they were.",
      },
      {
        question: "Can I format very large JSON files?",
        answer: "Yes, the formatter is optimized to handle large, deeply nested documents without freezing.",
      },
      {
        question: "Why use a JSON formatter?",
        answer:
          "JSON returned by APIs, logs, or config files is often minified or inconsistently indented, which makes it hard to scan by eye. A formatter re-indents the document consistently so nested objects and arrays are easy to read, without touching the underlying data.",
      },
      {
        question: "Why format JSON online instead of in my editor?",
        answer:
          "An online formatter needs no plugin, extension, or setup — paste JSON and get readable output immediately, from any device or browser. It's also useful when you're working somewhere you can't install tools, like a locked-down work laptop or a quick check on mobile.",
      },
      {
        question: "How do I format a JSON file?",
        answer:
          "Click Upload (or drag a .json file onto the editor) to load it, choose 2 spaces, 4 spaces, or tabs, and the formatted result appears automatically in the output panel. Use Copy or Download to save it once you're happy with it.",
      },
      {
        question: "How do I format JSON from a URL?",
        answer:
          "Paste a link that returns raw JSON into the \"Load from URL\" field above the editor and press Load — the tool fetches the response and formats it for you. This only works for URLs that allow cross-origin requests (CORS); if a site blocks it, save the response as a file and use Upload instead.",
      },
      {
        question: "Do I need to log in to save my JSON?",
        answer:
          "No — there's no account system, and nothing you format is ever sent to or saved on a server. Everything runs locally in your browser, so there's nothing to log in to and nothing tied to your identity.",
      },
      {
        question: "What happens to my JSON if I close the tab?",
        answer:
          "Because nothing is saved to a server, closing or refreshing the tab clears whatever is in the editor — there's no cloud copy to recover. Copy or download your formatted output before navigating away if you want to keep it.",
      },
    ],
  },
  {
    slug: "json-repair",
    name: "JSON Repair",
    shortName: "Repair",
    category: "core",
    tagline: "Automatically fix broken JSON and see exactly what changed.",
    description:
      "Paste broken JSON — missing commas, single quotes, unquoted keys, trailing commas, unbalanced brackets — and get a corrected document plus a step-by-step log explaining every fix.",
    metaTitle: "JSON Repair — Fix Broken JSON Online Free | JSONValidator.in",
    metaDescription:
      "Automatically repair broken JSON: missing commas, single quotes, unquoted keys, trailing commas, and unbalanced brackets. See a full log of every fix applied.",
    keywords: ["json repair", "fix json", "repair broken json", "json fixer online"],
    sampleInput: SAMPLE_BROKEN,
    isLive: true,
    features: [
      {
        title: "Explains every fix",
        description: "Each repair step is logged in plain language, so you learn what was wrong and why.",
      },
      {
        title: "Fixes common mistakes",
        description: "Handles single quotes, unquoted keys, trailing/missing commas, and unbalanced brackets.",
      },
      {
        title: "Safe, deterministic passes",
        description: "Repairs run as a fixed, transparent pipeline — never a black-box guess at your data.",
      },
      {
        title: "Falls back gracefully",
        description: "If a document can't be fully repaired, you still get the exact location of what's left.",
      },
    ],
    faqs: [
      {
        question: "What kinds of JSON errors can this fix?",
        answer:
          "It handles the most common hand-editing mistakes: single-quoted strings, unquoted object keys, trailing or duplicated commas, missing commas between values, JS-style comments, and unbalanced braces or brackets.",
      },
      {
        question: "Will it change my actual data values?",
        answer:
          "No. The repair pipeline only touches JSON syntax — punctuation, quoting, and whitespace — never the values themselves.",
      },
      {
        question: "What happens if it can't fully repair my JSON?",
        answer:
          "You'll still see every fix that was successfully applied, plus the exact line and column of whatever issue remains, so you can finish the fix by hand.",
      },
    ],
  },
  {
    slug: "json-viewer",
    name: "JSON Viewer",
    shortName: "Viewer",
    category: "core",
    tagline: "Explore JSON as a collapsible, color-coded tree.",
    description:
      "Paste JSON and instantly browse it as a navigable tree — expand and collapse objects and arrays, see item counts at a glance, and scan large documents without scrolling through raw text.",
    metaTitle: "JSON Viewer — Browse JSON as a Tree Online | JSONValidator.in",
    metaDescription:
      "View JSON as a collapsible, color-coded tree online. Expand and collapse nested objects and arrays instantly. Free, fast, and runs entirely in your browser.",
    keywords: ["json viewer", "json tree view", "view json online", "json browser"],
    sampleInput: `{
  "company": "Nimbus Retail",
  "founded": 2016,
  "public": false,
  "categories": ["electronics", "home", "outdoors"],
  "headquarters": {
    "city": "Bengaluru",
    "country": "India"
  },
  "topProducts": [
    { "sku": "NR-1001", "name": "Wireless Mouse", "price": 799 },
    { "sku": "NR-1002", "name": "Mechanical Keyboard", "price": 3499 }
  ]
}`,
    isLive: true,
    features: [
      {
        title: "Collapsible tree",
        description: "Expand or collapse any object or array node individually, or all at once.",
      },
      {
        title: "Color-coded types",
        description: "Strings, numbers, booleans, and null are each colored distinctly for fast scanning.",
      },
      {
        title: "Item counts while collapsed",
        description: "Collapsed nodes show how many keys or items they contain, so you know what's inside before opening it.",
      },
      {
        title: "Handles deep nesting",
        description: "Built to stay responsive on deeply nested API responses and configuration files.",
      },
    ],
    faqs: [
      {
        question: "How is a JSON viewer different from a formatter?",
        answer:
          "A formatter re-indents raw text; a viewer renders the document as an interactive tree you can expand, collapse, and navigate — useful for exploring large or deeply nested JSON without scrolling through hundreds of lines.",
      },
      {
        question: "Can I collapse just part of the tree?",
        answer:
          "Yes — click any object or array to toggle it individually, or use Expand all / Collapse all to control the whole tree at once.",
      },
      {
        question: "Does the tree view work with large JSON files?",
        answer: "Yes, the viewer is built to stay responsive with large, deeply nested documents like full API responses.",
      },
    ],
  },
  {
    slug: "json-to-csv",
    name: "JSON to CSV",
    shortName: "JSON to CSV",
    category: "convert",
    tagline: "Convert JSON arrays and objects into spreadsheet-ready CSV.",
    description:
      "Convert a JSON array of objects — or a single nested object — into CSV. Nested fields are flattened into dot-notation columns so the result opens cleanly in Excel, Google Sheets, or any spreadsheet tool.",
    metaTitle: "JSON to CSV Converter — Convert JSON to CSV Online | JSONValidator.in",
    metaDescription:
      "Convert JSON to CSV online, free. Automatically flattens nested objects and arrays into spreadsheet-ready columns. Runs entirely in your browser.",
    keywords: ["json to csv", "convert json to csv", "json to csv converter online", "json to excel"],
    sampleInput: `[
  { "id": 1, "name": "Asha Verma", "address": { "city": "Pune", "pincode": "411001" } },
  { "id": 2, "name": "Rohan Mehta", "address": { "city": "Nashik", "pincode": "422001" } }
]`,
    isLive: true,
    features: [
      {
        title: "Flattens nested data",
        description: "Nested objects and arrays become dot-notation columns like address.city automatically.",
      },
      {
        title: "Handles arrays of objects",
        description: "The common case — a JSON array of records — converts straight into one CSV row per record.",
      },
      {
        title: "Spreadsheet-safe escaping",
        description: "Commas, quotes, and line breaks inside values are escaped so the CSV opens correctly everywhere.",
      },
      {
        title: "One-click download",
        description: "Download the result as a .csv file ready to open in Excel or Google Sheets.",
      },
    ],
    faqs: [
      {
        question: "What JSON structures can this convert?",
        answer:
          "It works best with a JSON array of objects (the most common API response shape), but it also accepts a single object or an array of primitive values.",
      },
      {
        question: "What happens to nested objects and arrays?",
        answer:
          "They're flattened into separate columns using dot notation for objects (e.g. address.city) and bracket notation for arrays (e.g. tags[0]), so no data is dropped.",
      },
      {
        question: "Will the column order stay consistent?",
        answer:
          "Yes — columns are collected in the order fields first appear across all records, so the header row lines up with your data predictably.",
      },
    ],
  },
  {
    slug: "json-to-xml",
    name: "JSON to XML",
    shortName: "JSON to XML",
    category: "convert",
    tagline: "Convert JSON into clean, indented XML.",
    description:
      "Convert JSON objects and arrays into well-formed, indented XML. Object keys become element names, arrays repeat the parent element, and special characters are escaped automatically.",
    metaTitle: "JSON to XML Converter — Convert JSON to XML Online | JSONValidator.in",
    metaDescription:
      "Convert JSON to XML online, free. Produces clean, indented, well-formed XML with automatic character escaping. Runs entirely in your browser.",
    keywords: ["json to xml", "convert json to xml", "json to xml converter online"],
    sampleInput: SAMPLE_VALID,
    isLive: true,
    features: [
      {
        title: "Well-formed output",
        description: "Produces valid, indented XML with a proper declaration and correctly nested elements.",
      },
      {
        title: "Automatic escaping",
        description: "Characters like &, <, and > are escaped so the output is always valid XML.",
      },
      {
        title: "Arrays become repeated elements",
        description: "JSON arrays convert into a repeated element per item, the conventional XML representation.",
      },
      {
        title: "Safe element names",
        description: "Keys that aren't valid XML element names are automatically sanitized so conversion never fails.",
      },
    ],
    faqs: [
      {
        question: "How are JSON arrays represented in XML?",
        answer:
          "Each item in an array becomes its own repeated XML element with the same tag name — the standard way arrays are represented in XML, since XML has no native array type.",
      },
      {
        question: "What happens to JSON keys that aren't valid XML tag names?",
        answer:
          "Keys with spaces or invalid characters are automatically sanitized into safe element names so the conversion always produces valid XML.",
      },
      {
        question: "Does the converter preserve data types?",
        answer:
          "XML has no built-in types, so numbers, booleans, and strings are all written as text content — exactly as most JSON-to-XML tools behave.",
      },
    ],
  },
  {
    slug: "json-tree-view",
    name: "JSON Tree View",
    shortName: "Tree View",
    category: "core",
    tagline: "Explore JSON as a collapsible, color-coded tree.",
    description: "Browse JSON as an interactive tree with expandable nodes — the same tree view as our JSON Viewer, tuned for the \\\"tree view\\\" workflow of drilling into deeply nested structures one level at a time.",
    metaTitle: "JSON Tree View — Explore JSON as a collapsible, color-coded tree | JSONValidator.in",
    metaDescription: "Browse JSON as an interactive tree with expandable nodes — the same tree view as our JSON Viewer, tuned for the \\\"tree view\\\" workflow of drilling into ...",
    keywords: ["json tree view","json tree viewer online","expand collapse json"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Collapsible tree",
        description: "Expand or collapse any branch individually, or all at once.",
      },
      {
        title: "Type-colored values",
        description: "Strings, numbers, booleans, and null are colored distinctly.",
      },
      {
        title: "Built for deep nesting",
        description: "Stays responsive on deeply nested API responses.",
      },
    ],
    faqs: [
      {
        question: "How is Tree View different from the JSON Viewer?",
        answer: "They're the same underlying tool — Tree View is here as its own page since \"json tree view\" is how a lot of people search for this specific workflow.",
      },
      {
        question: "Can I collapse just one branch?",
        answer: "Yes, click any object or array to toggle it individually, or use Expand all / Collapse all for the whole tree.",
      },
    ],
  },
  {
    slug: "json-diff",
    name: "JSON Diff",
    shortName: "Diff",
    category: "core",
    tagline: "Compare two JSON documents and see exactly what changed.",
    description: "Paste two JSON documents to see added, removed, and changed fields at a glance — useful for comparing API responses across versions, environments, or deployments.",
    metaTitle: "JSON Diff — Compare two JSON documents and see exactly what changed | JSONValidator.in",
    metaDescription: "Paste two JSON documents to see added, removed, and changed fields at a glance — useful for comparing API responses across versions, environments, or de...",
    keywords: ["json diff","compare json online","json comparison tool"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Path-level differences",
        description: "Every change is reported with its exact dot-notation path.",
      },
      {
        title: "Handles arrays and objects",
        description: "Compares nested arrays and objects recursively, not just top-level keys.",
      },
      {
        title: "Nothing uploaded",
        description: "Both documents are compared entirely in your browser.",
      },
    ],
    faqs: [
      {
        question: "What counts as a difference?",
        answer: "Any field that was added, removed, or whose value changed between the two documents — including inside nested objects and arrays.",
      },
      {
        question: "Does key order matter?",
        answer: "No — JSON objects are unordered, so the diff compares values by key, not by position.",
      },
    ],
  },
  {
    slug: "json-escape",
    name: "JSON Escape",
    shortName: "Escape",
    category: "core",
    tagline: "Escape plain text into a valid JSON string literal.",
    description: "Convert a block of text — code, multi-line strings, anything with quotes or newlines — into a properly escaped JSON string literal you can drop straight into a JSON document.",
    metaTitle: "JSON Escape — Escape plain text into a valid JSON string literal | JSONValidator.in",
    metaDescription: "Convert a block of text — code, multi-line strings, anything with quotes or newlines — into a properly escaped JSON string literal you can drop straight...",
    keywords: ["json escape","escape json string online","json string escape tool"],
    sampleInput: "Hello \"world\"\\nThis has a newline and \"quotes\".",
    isLive: true,
    features: [
      {
        title: "Handles all JSON escapes",
        description: "Quotes, backslashes, newlines, tabs, and unicode are all escaped correctly.",
      },
      {
        title: "Ready to paste",
        description: "Output includes the surrounding quotes, ready to use as a JSON value.",
      },
      {
        title: "Nothing leaves your browser",
        description: "Uses JSON.stringify under the hood, entirely client-side.",
      },
    ],
    faqs: [
      {
        question: "What does escaping actually do?",
        answer: "It adds backslashes before characters that would otherwise break JSON syntax (like quotes) and converts control characters like newlines into their \\n escape sequence.",
      },
      {
        question: "Does it add the surrounding quotes?",
        answer: "Yes — the output is a complete JSON string literal, quotes included, ready to paste as a value.",
      },
    ],
  },
  {
    slug: "json-unescape",
    name: "JSON Unescape",
    shortName: "Unescape",
    category: "core",
    tagline: "Unescape a JSON string literal back into plain, readable text.",
    description: "Paste an escaped JSON string — with \\n, \\\", and other escape sequences — and get the original, human-readable text back.",
    metaTitle: "JSON Unescape — Unescape a JSON string literal back into plain, readable text | JSONValidator.in",
    metaDescription: "Paste an escaped JSON string — with \\n, \\\", and other escape sequences — and get the original, human-readable text back.",
    keywords: ["json unescape","unescape json string online","decode json string"],
    sampleInput: "\"Hello \\\"world\\\"\\nThis has a newline.\"",
    isLive: true,
    features: [
      {
        title: "Reverses JSON escaping",
        description: "Converts \\n, \\t, \\\", and unicode escapes back to real characters.",
      },
      {
        title: "Works with or without quotes",
        description: "Paste the string literal with or without its surrounding quotes.",
      },
      {
        title: "Instant, client-side",
        description: "No upload, no delay — unescapes as you type.",
      },
    ],
    faqs: [
      {
        question: "Do I need to include the surrounding quotes?",
        answer: "No — the tool works whether or not you paste the surrounding double quotes.",
      },
      {
        question: "What if the string isn't validly escaped?",
        answer: "You'll get a clear error rather than garbled output, so you know to check the source string.",
      },
    ],
  },
  {
    slug: "json-sort-keys",
    name: "JSON Sort Keys",
    shortName: "Sort Keys",
    category: "core",
    tagline: "Sort every object key alphabetically, at every depth.",
    description: "Normalize a JSON document by sorting object keys alphabetically throughout — handy for producing consistent diffs and easier-to-scan documents.",
    metaTitle: "JSON Sort Keys — Sort every object key alphabetically, at every depth | JSONValidator.in",
    metaDescription: "Normalize a JSON document by sorting object keys alphabetically throughout — handy for producing consistent diffs and easier-to-scan documents.",
    keywords: ["json sort keys","sort json alphabetically","normalize json order"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Sorts at every depth",
        description: "Nested objects are sorted recursively, not just the top level.",
      },
      {
        title: "Values untouched",
        description: "Only key order changes — every value stays exactly as it was.",
      },
      {
        title: "Great before diffing",
        description: "Sort two versions of a document first to make real changes easier to spot.",
      },
    ],
    faqs: [
      {
        question: "Does this change the data?",
        answer: "No — only the order keys appear in changes. Since JSON objects are unordered by spec, this never affects meaning.",
      },
      {
        question: "Are array item orders changed?",
        answer: "No, only object keys are sorted — array item order is always preserved.",
      },
    ],
  },
  {
    slug: "json-flatten",
    name: "JSON Flatten",
    shortName: "Flatten",
    category: "core",
    tagline: "Flatten nested JSON into dot-notation keys.",
    description: "Convert deeply nested JSON into a single-level object using dot and bracket notation keys (like address.city) — useful for feeding JSON into flat systems like spreadsheets or key-value stores.",
    metaTitle: "JSON Flatten — Flatten nested JSON into dot-notation keys | JSONValidator.in",
    metaDescription: "Convert deeply nested JSON into a single-level object using dot and bracket notation keys (like address.city) — useful for feeding JSON into flat system...",
    keywords: ["json flatten","flatten nested json","json to flat object"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Dot + bracket notation",
        description: "Nested objects become dot paths; arrays become bracket-indexed paths.",
      },
      {
        title: "Reversible",
        description: "Pair with JSON Unflatten to convert flattened keys back into nested JSON.",
      },
      {
        title: "No data loss",
        description: "Every value is preserved — only the shape changes.",
      },
    ],
    faqs: [
      {
        question: "What happens to arrays?",
        answer: "Array items get bracket-indexed keys, e.g. roles[0], roles[1], so no data is lost.",
      },
      {
        question: "Can I reverse this?",
        answer: "Yes — use the JSON Unflatten tool to rebuild the original nested structure.",
      },
    ],
  },
  {
    slug: "json-unflatten",
    name: "JSON Unflatten",
    shortName: "Unflatten",
    category: "core",
    tagline: "Rebuild nested JSON from flattened dot-notation keys.",
    description: "Convert a flat object with dot/bracket-notation keys (like address.city) back into properly nested JSON.",
    metaTitle: "JSON Unflatten — Rebuild nested JSON from flattened dot-notation keys | JSONValidator.in",
    metaDescription: "Convert a flat object with dot/bracket-notation keys (like address.city) back into properly nested JSON.",
    keywords: ["json unflatten","unflatten json","flat to nested json"],
    sampleInput: `{
  "address.city": "Pune",
  "address.pincode": "411001",
  "roles[0]": "admin",
  "roles[1]": "editor"
}`,
    isLive: true,
    features: [
      {
        title: "Rebuilds nested structure",
        description: "Dot and bracket notation keys become properly nested objects and arrays.",
      },
      {
        title: "Pairs with Flatten",
        description: "The exact reverse of the JSON Flatten tool.",
      },
      {
        title: "Handles arrays correctly",
        description: "Bracket-indexed keys are rebuilt as real arrays, not object-like maps.",
      },
    ],
    faqs: [
      {
        question: "What key format does this expect?",
        answer: "Dot notation for nested objects (address.city) and bracket notation for arrays (roles[0]).",
      },
      {
        question: "What if my keys aren't in that format?",
        answer: "Keys without dots or brackets are kept as flat top-level keys, unchanged.",
      },
    ],
  },
  {
    slug: "json-search",
    name: "JSON Search",
    shortName: "Search",
    category: "core",
    tagline: "Search for a key or value anywhere inside a JSON document.",
    description: "Find every place a key or value appears inside a large JSON document, with the full path to each match — much faster than scanning by eye.",
    metaTitle: "JSON Search — Search for a key or value anywhere inside a JSON document | JSONValidator.in",
    metaDescription: "Find every place a key or value appears inside a large JSON document, with the full path to each match — much faster than scanning by eye.",
    keywords: ["json search","search json online","find key in json"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Searches keys and values",
        description: "Matches both object keys and primitive values, case-insensitively.",
      },
      {
        title: "Full path for every match",
        description: "Each result shows the exact dot-notation path to that field.",
      },
      {
        title: "Instant results",
        description: "Results update as you type, entirely in your browser.",
      },
    ],
    faqs: [
      {
        question: "Does search look inside arrays?",
        answer: "Yes — arrays are searched recursively along with objects, at any depth.",
      },
      {
        question: "Is the search case-sensitive?",
        answer: "No, matching is case-insensitive for both keys and values.",
      },
    ],
  },
  {
    slug: "json-merge",
    name: "JSON Merge",
    shortName: "Merge",
    category: "core",
    tagline: "Deep-merge two JSON documents into one.",
    description: "Combine two JSON documents into one, with the second document's values overriding the first's on conflict — nested objects are merged recursively, not just replaced.",
    metaTitle: "JSON Merge — Deep-merge two JSON documents into one | JSONValidator.in",
    metaDescription: "Combine two JSON documents into one, with the second document's values overriding the first's on conflict — nested objects are merged recursively, not j...",
    keywords: ["json merge","merge json objects online","combine json documents"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Deep merge, not shallow",
        description: "Nested objects are merged field-by-field, not simply overwritten.",
      },
      {
        title: "Predictable conflict rule",
        description: "The second (\"Overrides\") document always wins on conflicting values.",
      },
      {
        title: "Great for config layering",
        description: "Combine a base config with environment-specific overrides.",
      },
    ],
    faqs: [
      {
        question: "What happens when both documents have the same array?",
        answer: "Arrays are replaced wholesale by the second document's array, rather than merged item-by-item, matching how most config-layering tools behave.",
      },
      {
        question: "Which document wins on conflicts?",
        answer: "The second (\"Overrides\") document always takes precedence over the first (\"Base\").",
      },
    ],
  },
  {
    slug: "json-to-yaml",
    name: "JSON to YAML",
    shortName: "JSON to YAML",
    category: "convert",
    tagline: "Convert JSON into clean, readable YAML.",
    description: "Convert JSON into YAML — ideal for turning an API response or config into the format used by tools like Docker Compose, Kubernetes, and GitHub Actions.",
    metaTitle: "JSON to YAML — Convert JSON into clean, readable YAML | JSONValidator.in",
    metaDescription: "Convert JSON into YAML — ideal for turning an API response or config into the format used by tools like Docker Compose, Kubernetes, and GitHub Actions.",
    keywords: ["json to yaml","convert json to yaml online","json to yaml converter"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Clean, idiomatic YAML",
        description: "Proper indentation and only quotes strings when actually necessary.",
      },
      {
        title: "Handles nested structures",
        description: "Objects and arrays of any depth convert correctly.",
      },
      {
        title: "No install required",
        description: "Skip writing a conversion script for a one-off YAML file.",
      },
    ],
    faqs: [
      {
        question: "Does this handle deeply nested JSON?",
        answer: "Yes, objects and arrays at any depth convert to properly indented YAML.",
      },
      {
        question: "Will strings get unnecessary quotes?",
        answer: "No — strings are only quoted when needed (e.g. if they'd otherwise be parsed as a number or boolean).",
      },
    ],
  },
  {
    slug: "json-to-typescript",
    name: "JSON to TypeScript",
    shortName: "JSON to TS",
    category: "convert",
    tagline: "Generate TypeScript interfaces from a JSON sample.",
    description: "Paste a sample JSON response and get matching TypeScript interfaces instantly — including nested interfaces for nested objects.",
    metaTitle: "JSON to TypeScript — Generate TypeScript interfaces from a JSON sample | JSONValidator.in",
    metaDescription: "Paste a sample JSON response and get matching TypeScript interfaces instantly — including nested interfaces for nested objects.",
    keywords: ["json to typescript","json to typescript interface","generate typescript types from json"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Nested interfaces",
        description: "Nested objects generate their own named interfaces, not inline blobs.",
      },
      {
        title: "Arrays typed correctly",
        description: "Arrays of objects or primitives produce correctly typed array fields.",
      },
      {
        title: "Paste straight into your codebase",
        description: "Output is valid, ready-to-use TypeScript.",
      },
    ],
    faqs: [
      {
        question: "How are nested objects named?",
        answer: "Nested interfaces are named after their parent key, capitalized — e.g. an \"address\" field generates an Address interface.",
      },
      {
        question: "What if a field can be null?",
        answer: "Fields observed as null in the sample are typed as null; for a field that's sometimes null and sometimes a value, edit the generated type to a union afterward.",
      },
    ],
  },
  {
    slug: "json-to-zod",
    name: "JSON to Zod Schema",
    shortName: "JSON to Zod",
    category: "convert",
    tagline: "Generate a Zod validation schema from a JSON sample.",
    description: "Paste a sample JSON response and get a ready-to-use Zod schema — the runtime validation library widely used in TypeScript projects — inferred from its shape.",
    metaTitle: "JSON to Zod Schema — Generate a Zod validation schema from a JSON sample | JSONValidator.in",
    metaDescription: "Paste a sample JSON response and get a ready-to-use Zod schema — the runtime validation library widely used in TypeScript projects — inferred from its s...",
    keywords: ["json to zod","generate zod schema from json","zod schema generator"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Nested z.object() support",
        description: "Nested objects generate nested z.object() calls, not flattened types.",
      },
      {
        title: "Sensible type inference",
        description: "Integers use z.number().int(), distinct from floating-point numbers.",
      },
      {
        title: "Ready-to-import output",
        description: "Includes the import statement and an inferred TypeScript type export.",
      },
    ],
    faqs: [
      {
        question: "Does the output include the import statement?",
        answer: "Yes — the generated code includes `import { z } from \"zod\"` and an exported inferred TypeScript type, ready to paste into a file.",
      },
      {
        question: "How are optional fields handled?",
        answer: "Every field from the sample is treated as required. If a field is genuinely optional in your API, add `.optional()` to that field after generating.",
      },
    ],
  },
  {
    slug: "json-to-python",
    name: "JSON to Python",
    shortName: "JSON to Python",
    category: "convert",
    tagline: "Convert JSON into a Python dict literal.",
    description: "Convert JSON into a Python dictionary/list literal — true/false become True/False and null becomes None, ready to paste directly into a .py file.",
    metaTitle: "JSON to Python — Convert JSON into a Python dict literal | JSONValidator.in",
    metaDescription: "Convert JSON into a Python dictionary/list literal — true/false become True/False and null becomes None, ready to paste directly into a .py file.",
    keywords: ["json to python","json to python dict","convert json to python dictionary"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Correct Python literals",
        description: "true/false/null become True/False/None automatically.",
      },
      {
        title: "Readable formatting",
        description: "Nested dicts and lists are indented for easy reading.",
      },
      {
        title: "Paste straight into a script",
        description: "Output is valid Python, ready to assign to a variable.",
      },
    ],
    faqs: [
      {
        question: "Why not just use Python's json.loads?",
        answer: "json.loads parses JSON at runtime from a string; this tool converts JSON into literal Python source code you can commit directly, e.g. for test fixtures.",
      },
      {
        question: "Are numbers preserved exactly?",
        answer: "Yes — integers and floats are preserved with their original precision.",
      },
    ],
  },
  {
    slug: "json-to-java",
    name: "JSON to Java",
    shortName: "JSON to Java",
    category: "convert",
    tagline: "Generate a Java POJO class from a JSON sample.",
    description: "Paste a sample JSON object and get a Java class with typed fields, getters, and setters — ready to paste into your project.",
    metaTitle: "JSON to Java — Generate a Java POJO class from a JSON sample | JSONValidator.in",
    metaDescription: "Paste a sample JSON object and get a Java class with typed fields, getters, and setters — ready to paste into your project.",
    keywords: ["json to java","json to java class","generate java pojo from json"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Getters and setters included",
        description: "Every field gets a standard public getter and setter method.",
      },
      {
        title: "Sensible type mapping",
        description: "Integers, doubles, booleans, Strings, Lists, and Maps are inferred correctly.",
      },
      {
        title: "Works with arrays of objects",
        description: "Pass an array and the first item's shape is used as the class template.",
      },
    ],
    faqs: [
      {
        question: "What if my JSON has nested objects?",
        answer: "Nested objects are currently typed as Map<String, Object> — copy the nested shape into its own conversion for a fully typed nested class.",
      },
      {
        question: "Can I set the class name?",
        answer: "The generated class is named GeneratedClass by default — just rename it after pasting into your project.",
      },
    ],
  },
  {
    slug: "json-to-sql",
    name: "JSON to SQL",
    shortName: "JSON to SQL",
    category: "convert",
    tagline: "Generate CREATE TABLE and INSERT statements from JSON.",
    description: "Convert a JSON array of objects into a CREATE TABLE statement plus one INSERT per record — a fast way to seed a database table from API data.",
    metaTitle: "JSON to SQL — Generate CREATE TABLE and INSERT statements from JSON | JSONValidator.in",
    metaDescription: "Convert a JSON array of objects into a CREATE TABLE statement plus one INSERT per record — a fast way to seed a database table from API data.",
    keywords: ["json to sql","json to sql insert","generate create table from json"],
    sampleInput: "[\n  { \"id\": 1, \"name\": \"Asha Verma\", \"email\": \"asha@example.com\", \"isActive\": true },\n  { \"id\": 2, \"name\": \"Rohan Mehta\", \"isActive\": false }\n]",
    isLive: true,
    features: [
      {
        title: "CREATE TABLE + INSERT",
        description: "Generates both the schema and the data-loading statements.",
      },
      {
        title: "Basic type inference",
        description: "Infers INTEGER, REAL, BOOLEAN, or TEXT column types from the first record.",
      },
      {
        title: "Safe string escaping",
        description: "Single quotes in string values are escaped correctly for SQL.",
      },
    ],
    faqs: [
      {
        question: "Which SQL dialect is this?",
        answer: "The output uses standard, portable SQL syntax that works with SQLite, PostgreSQL, and MySQL with little to no adjustment.",
      },
      {
        question: "What determines the column types?",
        answer: "Types are inferred from the first record in the array — make sure it's representative of the rest.",
      },
    ],
  },
  {
    slug: "json-schema-validator",
    name: "JSON Schema Validator",
    shortName: "Schema Validator",
    category: "schema",
    tagline: "Validate a JSON document against a JSON Schema.",
    description: "Check that a JSON document actually matches the structure you expect — required fields, correct types, string patterns, and value ranges — using a real JSON Schema.",
    metaTitle: "JSON Schema Validator — Validate a JSON document against a JSON Schema | JSONValidator.in",
    metaDescription: "Check that a JSON document actually matches the structure you expect — required fields, correct types, string patterns, and value ranges — using a real ...",
    keywords: ["json schema validator","validate json against schema","json schema checker"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Real JSON Schema support",
        description: "Supports type, properties, required, items, enum, and range/length constraints.",
      },
      {
        title: "Clear, specific errors",
        description: "Every violation names the exact field and what was expected.",
      },
      {
        title: "No account or upload",
        description: "Both the document and the schema are validated entirely in your browser.",
      },
    ],
    faqs: [
      {
        question: "Which JSON Schema keywords are supported?",
        answer: "type, properties, required, items, enum, minimum/maximum, minLength/maxLength, and pattern cover the large majority of everyday schemas.",
      },
      {
        question: "Do I need to write the schema by hand?",
        answer: "No — use our JSON Schema Generator to infer a starting schema from a sample, then adjust it.",
      },
    ],
  },
  {
    slug: "json-schema-generator",
    name: "JSON Schema Generator",
    shortName: "Schema Generator",
    category: "schema",
    tagline: "Infer a JSON Schema from a sample document.",
    description: "Paste a sample JSON document and get a draft JSON Schema inferred from its structure — types, required fields, and nested object/array shapes included.",
    metaTitle: "JSON Schema Generator — Infer a JSON Schema from a sample document | JSONValidator.in",
    metaDescription: "Paste a sample JSON document and get a draft JSON Schema inferred from its structure — types, required fields, and nested object/array shapes included.",
    keywords: ["json schema generator","generate json schema from json","infer json schema"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Infers types and required fields",
        description: "Every key present in the sample is marked required by default.",
      },
      {
        title: "Nested schemas included",
        description: "Nested objects and arrays get their own nested schema definitions.",
      },
      {
        title: "Pairs with Schema Validator",
        description: "Generate a starting schema here, then validate future documents against it.",
      },
    ],
    faqs: [
      {
        question: "Will every field be marked required?",
        answer: "Yes, by default — since the generator only sees one sample, it treats every present field as required. Edit the generated schema to relax fields that are actually optional.",
      },
      {
        question: "What JSON Schema draft is this?",
        answer: "The output targets draft-07, which is broadly compatible with most JSON Schema validators.",
      },
    ],
  },
  {
    slug: "api-mock-generator",
    name: "API Mock Generator",
    shortName: "Mock Generator",
    category: "convert",
    tagline: "Generate realistic fake JSON records matching a sample shape.",
    description: "Paste a sample JSON record (or array) and generate any number of realistic fake records with the same shape — names, emails, dates, and IDs are generated to look plausible, not just random strings.",
    metaTitle: "API Mock Generator — Generate realistic fake JSON records matching a sample shape | JSONValidator.in",
    metaDescription: "Paste a sample JSON record (or array) and generate any number of realistic fake records with the same shape — names, emails, dates, and IDs are generate...",
    keywords: ["json mock data generator","fake api data generator","generate mock json"],
    sampleInput: "[{\"id\":1,\"name\":\"Asha Verma\",\"email\":\"asha@example.com\",\"active\":true}]",
    isLive: true,
    features: [
      {
        title: "Shape-aware generation",
        description: "Field names like email, date, and price generate plausible values, not gibberish.",
      },
      {
        title: "Generate 1 to 50 records",
        description: "Choose exactly how many fake records you need for a test fixture.",
      },
      {
        title: "Great for frontend development",
        description: "Mock an API response before the real backend endpoint exists.",
      },
    ],
    faqs: [
      {
        question: "How does it decide what kind of fake value to generate?",
        answer: "It looks at each field's name — fields like email, name, date, price, and id get type-appropriate fake values, and everything else falls back to a value matching the sample's type.",
      },
      {
        question: "Can I generate more than 50 records at once?",
        answer: "The tool caps at 50 per generation to stay fast and responsive in-browser; run it multiple times and combine the output for larger fixtures.",
      },
    ],
  },
  {
    slug: "json-secret-scanner",
    name: "JSON Secret Scanner",
    shortName: "Secret Scanner",
    category: "core",
    tagline: "Scan JSON for API keys, tokens, and other secrets before you share it.",
    description: "Paste JSON before pasting it into a bug report, a Slack message, or a GitHub issue — this scans for AWS keys, Stripe keys, JWTs, private key blocks, emails, and fields with sensitive names like \"password\" or \"token\".",
    metaTitle: "JSON Secret Scanner — Scan JSON for API keys, tokens, and other secrets before you share it | JSONValidator.in",
    metaDescription: "Paste JSON before pasting it into a bug report, a Slack message, or a GitHub issue — this scans for AWS keys, Stripe keys, JWTs, private key blocks, ema...",
    keywords: ["json secret scanner","detect api keys in json","sensitive data scanner json"],
    sampleInput: `{
  "username": "asha",
  "password": "hunter2",
  "apiKey": "AKIAABCDEFGHIJKLMNOP",
  "email": "asha@example.com"
}`,
    isLive: true,
    isPro: true,
    proTier: "starter",
    features: [
      {
        title: "Pattern-based detection",
        description: "Recognizes common formats: AWS keys, Stripe keys, GitHub tokens, JWTs, private key blocks, and more.",
      },
      {
        title: "Sensitive field names, too",
        description: "Flags fields named password, token, secret, ssn, and similar regardless of value format.",
      },
      {
        title: "Masked previews",
        description: "Findings show a masked preview, not the full secret, when displaying results.",
      },
    ],
    faqs: [
      {
        question: "Is this a guarantee nothing sensitive is in my JSON?",
        answer: "No — it's a heuristic pattern scan that catches common, recognizable formats. Always review manually before sharing JSON that might contain real credentials.",
      },
      {
        question: "Does scanning send my data anywhere?",
        answer: "No, the scan runs entirely in your browser — which matters, since you're specifically checking for secrets you don't want to expose.",
      },
    ],
  },
  {
    slug: "json-sanitizer",
    name: "JSON Sanitizer",
    shortName: "Sanitizer",
    category: "core",
    tagline: "Redact sensitive fields before sharing a JSON sample.",
    description: "Automatically redact values in commonly-sensitive fields — passwords, tokens, emails, secrets — replacing them with a placeholder so you can safely share JSON in a bug report or documentation.",
    metaTitle: "JSON Sanitizer — Redact sensitive fields before sharing a JSON sample | JSONValidator.in",
    metaDescription: "Automatically redact values in commonly-sensitive fields — passwords, tokens, emails, secrets — replacing them with a placeholder so you can safely shar...",
    keywords: ["json sanitizer","redact json fields","remove sensitive data from json"],
    sampleInput: `{
  "username": "asha",
  "password": "hunter2",
  "email": "asha@example.com",
  "isActive": true
}`,
    isLive: true,
    features: [
      {
        title: "Redacts by field name",
        description: "Fields like password, token, secret, ssn, and email are automatically replaced.",
      },
      {
        title: "Structure fully preserved",
        description: "Only sensitive values change — the shape of the document stays intact for testing.",
      },
      {
        title: "Pairs with Secret Scanner",
        description: "Scan first to see what would be flagged, then sanitize before sharing.",
      },
    ],
    faqs: [
      {
        question: "What gets redacted?",
        answer: "Any field whose name matches a built-in list of sensitive field names (password, token, secret, email, ssn, credit card, and similar) — non-null values are replaced with \\\"***REDACTED***\\\".",
      },
      {
        question: "Can I choose which fields to redact?",
        answer: "The current version uses a fixed sensitive-field list; a customizable field list is a natural next step if you need it.",
      },
    ],
  },
  {
    slug: "json-complexity-analyzer",
    name: "JSON Complexity Analyzer",
    shortName: "Complexity Analyzer",
    category: "core",
    tagline: "Spot deeply nested structures, huge arrays, and oversized payloads.",
    description: "Analyzes a JSON document's depth, key counts, and array sizes, and flags structural patterns that tend to cause slow parsing, awkward APIs, or bloated payloads.",
    metaTitle: "JSON Complexity Analyzer — Spot deeply nested structures, huge arrays, and oversized payloads | JSONValidator.in",
    metaDescription: "Analyzes a JSON document's depth, key counts, and array sizes, and flags structural patterns that tend to cause slow parsing, awkward APIs, or bloated p...",
    keywords: ["json complexity analyzer","json performance analysis","json depth checker"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Depth and size metrics",
        description: "Reports max nesting depth, total keys, largest array, and payload size.",
      },
      {
        title: "Actionable warnings",
        description: "Flags specific structural issues rather than just dumping raw numbers.",
      },
      {
        title: "Useful before shipping an API",
        description: "Catch overly deep or overly wide response shapes before they reach consumers.",
      },
    ],
    faqs: [
      {
        question: "What counts as \\\"too deep\\\"?",
        answer: "The analyzer flags nesting deeper than 8 levels as worth a second look — deep nesting isn't inherently wrong, but it usually signals an API shape that's hard for consumers to work with.",
      },
      {
        question: "Does this check for actual runtime performance?",
        answer: "No — it's a structural heuristic based on shape and size, not a benchmark of your specific parser or runtime.",
      },
    ],
  },
  {
    slug: "json-payload-optimizer",
    name: "JSON Payload Optimizer",
    shortName: "Payload Optimizer",
    category: "core",
    tagline: "See how much smaller your JSON payload could be.",
    description: "Reports minification savings and flags null or empty fields that could be omitted entirely, so you can trim an API response before shipping it.",
    metaTitle: "JSON Payload Optimizer — See how much smaller your JSON payload could be | JSONValidator.in",
    metaDescription: "Reports minification savings and flags null or empty fields that could be omitted entirely, so you can trim an API response before shipping it.",
    keywords: ["json payload optimizer","reduce json size","json size optimization"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    isPro: true,
    proTier: "starter",
    features: [
      {
        title: "Minification savings",
        description: "Shows exactly how many bytes whitespace removal alone would save.",
      },
      {
        title: "Finds empty/null fields",
        description: "Lists every null, empty string, empty array, or empty object with its path.",
      },
      {
        title: "Practical next steps",
        description: "Notes that transport-level compression is usually the bigger win.",
      },
    ],
    faqs: [
      {
        question: "Should I always remove null fields?",
        answer: "Only if your API consumers treat a missing key the same as a null value — check that assumption before dropping fields from a public API.",
      },
      {
        question: "Is minifying enough to shrink a payload significantly?",
        answer: "It helps, but gzip/Brotli compression at the transport layer typically saves far more than JSON-level whitespace removal alone.",
      },
    ],
  },
  {
    slug: "json-field-mapper",
    name: "JSON Field Mapper",
    shortName: "Field Mapper",
    category: "core",
    tagline: "Rename JSON keys throughout a document using a mapping table.",
    description: "Provide a simple {\\\"oldKey\\\": \\\"newKey\\\"} mapping and rename that key everywhere it appears in a JSON document, at any depth — useful for adapting one API's response shape to another's.",
    metaTitle: "JSON Field Mapper — Rename JSON keys throughout a document using a mapping table | JSONValidator.in",
    metaDescription: "Provide a simple {\\\"oldKey\\\": \\\"newKey\\\"} mapping and rename that key everywhere it appears in a JSON document, at any depth — useful for adapting one A...",
    keywords: ["json field mapper","rename json keys","remap json fields"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Renames at every depth",
        description: "The same key is renamed wherever it appears, nested or not.",
      },
      {
        title: "Simple mapping format",
        description: "Just a flat JSON object of old-key-to-new-key pairs.",
      },
      {
        title: "Great for API adapters",
        description: "Quickly reshape one service's field names to match another's contract.",
      },
    ],
    faqs: [
      {
        question: "What if a key in my mapping doesn't exist in the data?",
        answer: "It's simply ignored — only keys present in both the data and the mapping are renamed.",
      },
      {
        question: "Does this rename nested keys too?",
        answer: "Yes — the rename is applied wherever that exact key name appears, at any depth in the document.",
      },
    ],
  },
  {
    slug: "json-doc-generator",
    name: "JSON Documentation Generator",
    shortName: "Doc Generator",
    category: "core",
    tagline: "Generate a Markdown field reference from a JSON sample.",
    description: "Paste a sample JSON response and get a clean Markdown table documenting every field, its inferred type, and an example value — ready to drop into API docs or a README.",
    metaTitle: "JSON Documentation Generator — Generate a Markdown field reference from a JSON sample | JSONValidator.in",
    metaDescription: "Paste a sample JSON response and get a clean Markdown table documenting every field, its inferred type, and an example value — ready to drop into API do...",
    keywords: ["json documentation generator","generate api docs from json","json to markdown docs"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Markdown table output",
        description: "Renders directly in GitHub READMEs, wikis, and most documentation tools.",
      },
      {
        title: "Type + example per field",
        description: "Every field lists its inferred type and a real example value from your sample.",
      },
      {
        title: "Covers nested fields",
        description: "Nested objects and array items are documented with their full path.",
      },
    ],
    faqs: [
      {
        question: "Does this replace a full API documentation tool?",
        answer: "No — it's a fast starting point for documenting a response shape, not a replacement for a full OpenAPI-based documentation pipeline.",
      },
      {
        question: "How are array fields represented?",
        answer: "An array field's path is suffixed with [] and documented using its first item's shape as the example.",
      },
    ],
  },
  {
    slug: "json-field-heatmap",
    name: "JSON Field Usage Heatmap",
    shortName: "Field Heatmap",
    category: "core",
    tagline: "See which fields actually show up across many JSON records.",
    description: "Paste a JSON array of records — API responses, log entries, exported rows — and see what percentage of records include each field, and whether its type is consistent across all of them.",
    metaTitle: "JSON Field Usage Heatmap — See which fields actually show up across many JSON records | JSONValidator.in",
    metaDescription: "Paste a JSON array of records — API responses, log entries, exported rows — and see what percentage of records include each field, and whether its type ...",
    keywords: ["json field usage heatmap","json field consistency checker","analyze json array fields"],
    sampleInput: "[\n  { \"id\": 1, \"name\": \"Asha Verma\", \"email\": \"asha@example.com\", \"isActive\": true },\n  { \"id\": 2, \"name\": \"Rohan Mehta\", \"isActive\": false }\n]",
    isLive: true,
    features: [
      {
        title: "Presence percentage per field",
        description: "See exactly what share of records actually include each field.",
      },
      {
        title: "Type consistency warnings",
        description: "Flags fields that show up with different types across records.",
      },
      {
        title: "Great for API auditing",
        description: "Spot fields that are technically optional but rarely used, or inconsistently typed.",
      },
    ],
    faqs: [
      {
        question: "What input does this expect?",
        answer: "A JSON array of objects — a batch of API responses, exported database rows, or log entries all work well.",
      },
      {
        question: "What does an inconsistent type warning mean?",
        answer: "It means the same field appeared with different JSON types across records (e.g. a number in some records, a string in others) — usually worth investigating on the source system.",
      },
    ],
  },
  {
    slug: "json-contract-checker",
    name: "JSON API Contract Checker",
    shortName: "Contract Checker",
    category: "core",
    tagline: "Check whether an API response matches its expected shape.",
    description: "Compare an actual API response against an expected \\\"contract\\\" sample, checking types and field presence only — not literal values — to catch breaking API changes before they reach production.",
    metaTitle: "JSON API Contract Checker — Check whether an API response matches its expected shape | JSONValidator.in",
    metaDescription: "Compare an actual API response against an expected \\\"contract\\\" sample, checking types and field presence only — not literal values — to catch breaking ...",
    keywords: ["json api contract checker","api contract testing json","compare api response shape"],
    sampleInput: "{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": true,\n  \"roles\": [\"admin\", \"editor\"],\n  \"address\": { \"city\": \"Pune\", \"pincode\": \"411001\" },\n  \"lastLogin\": null\n}",
    isLive: true,
    features: [
      {
        title: "Shape, not values",
        description: "Ignores literal value differences — only flags missing fields, extra fields, and type mismatches.",
      },
      {
        title: "Catch breaking changes early",
        description: "Compare a new API response against a saved contract before deploying a client that depends on it.",
      },
      {
        title: "Works with nested objects and arrays",
        description: "Recursively checks structure at every level, including array item shapes.",
      },
    ],
    faqs: [
      {
        question: "How is this different from JSON Diff?",
        answer: "Diff reports value changes; this tool ignores values entirely and only reports whether the shape (fields and types) still matches — the right check for \"did this API response break my client?\"",
      },
      {
        question: "What does a type mismatch mean?",
        answer: "It means a field that was, say, a string in the contract came back as a number (or vice versa) in the actual response — usually a sign of a backend change that needs a heads-up to API consumers.",
      },
    ],
  },
  {
    slug: "json-health-score",
    name: "JSON Health Score",
    shortName: "Health Score",
    category: "core",
    tagline: "A single 0-100 quality score for any JSON document.",
    description:
      "Get an overall JSON Health Score out of 100, broken down across five categories — syntax, structure, security, maintainability, and performance — with every point deduction explained and a concrete suggestion for fixing it.",
    metaTitle: "JSON Health Score — Rate Your JSON's Quality | JSONValidator.in",
    metaDescription:
      "Get a 0-100 JSON Health Score across syntax, structure, security, maintainability, and performance, with every deduction explained and an exportable report.",
    keywords: ["json health score", "json quality score", "json quality checker"],
    sampleInput: `{
  "id": 1024,
  "user_name": "Asha Verma",
  "userEmail": "asha@example.com",
  "apiKey": "AKIAABCDEFGHIJKLMNOP",
  "roles": ["admin", 2, true],
  "isActive": true
}`,
    isLive: true,
    isPro: true,
    proTier: "starter",
    features: [
      { title: "Five weighted categories", description: "Syntax, structure, security, maintainability, and performance — 20 points each." },
      { title: "Every deduction explained", description: "No black-box scoring — each point lost is tied to a specific, named issue." },
      { title: "Concrete suggestions", description: "Every category of issue comes with an actionable fix, not just a warning." },
      { title: "Exportable report", description: "Download the full breakdown as a text report to share or archive." },
    ],
    faqs: [
      { question: "How is the score calculated?", answer: "Each of the five categories starts at 20 points; specific issues (like a detected secret, inconsistent array types, or excessive nesting) deduct points from their category, and the five category scores add up to the overall 0-100 score." },
      { question: "Does a low score mean my JSON is invalid?", answer: "No — the Health Score only runs on syntactically valid JSON. A low score means the JSON parses fine but has structural, security, or maintainability issues worth addressing." },
      { question: "Is this the same engine as the Secret Scanner and Complexity Analyzer?", answer: "Yes — the Health Score's Security and Performance categories reuse those exact tools internally, so the results stay consistent whichever tool you use." },
    ],
  },
  {
    slug: "json-semantic-diff",
    name: "Semantic Diff",
    shortName: "Semantic Diff",
    category: "core",
    tagline: "Compare JSON by meaning, not just characters — and know if it's a breaking change.",
    description:
      "Compare two versions of a JSON document and get a compatibility report: added fields, removed fields, renamed fields, type changes, and value changes — each classified as breaking or non-breaking, with an overall risk level and migration suggestions.",
    metaTitle: "Semantic JSON Diff — Breaking Change Detector | JSONValidator.in",
    metaDescription:
      "Compare two JSON versions semantically: detect renamed fields, type changes, and breaking API changes, with a compatibility report and migration suggestions.",
    keywords: ["semantic json diff", "breaking change detector json", "api compatibility checker"],
    sampleInput: `{
  "id": 1024,
  "userName": "Asha Verma",
  "isActive": true,
  "roles": ["admin"]
}`,
    isLive: true,
    isPro: true,
    proTier: "starter",
    features: [
      { title: "Rename detection", description: "Distinguishes a renamed field from an unrelated add+remove pair." },
      { title: "Breaking vs. non-breaking", description: "Every change is classified so you know exactly what actually risks breaking a client." },
      { title: "Risk level + migration suggestions", description: "Get an overall compatibility risk level and a concrete suggestion for every breaking change." },
    ],
    faqs: [
      { question: "How is this different from JSON Diff?", answer: "JSON Diff reports every value difference; Semantic Diff focuses on structural/type changes and classifies each one as breaking or non-breaking — the right tool for \"did this change break my API contract?\"" },
      { question: "How does rename detection work?", answer: "It's a heuristic: if a field disappears and another field of the exact same type (and, for objects/arrays, the same shape) appears in its place, it's flagged as a likely rename rather than an unrelated add and remove." },
      { question: "What does \"Risk Level\" mean?", answer: "It's based on how many breaking changes were found — None (0), Low (1-2), Medium (3-5), or High (6+) — a quick signal for how carefully a deploy needs to be reviewed." },
    ],
  },
];

export const toolBySlug = (slug: string): ToolConfig | undefined => tools.find((t) => t.slug === slug);

/** Tools shown on the site as "coming soon" — used for the mega menu and roadmap, not routed. */
export const roadmapTools: { name: string; category: ToolCategory }[] = [];
