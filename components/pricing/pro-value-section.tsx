import { ShieldAlert, GitCompareArrows, FileText } from "lucide-react";

const proValueItems = [
    {
        icon: ShieldAlert,
        title: "Secret Scanner",
        problem:
            "You paste a config or API response into a tool to debug it, forget it has a live key in it — now that key is sitting in your clipboard history or a shared Slack thread.",
        solution:
            "Every payload is scanned before you can copy or download it. Leaked keys, tokens, and credentials are flagged and redacted automatically — the check that saves you a \"rotate all our keys\" incident.",
    },
    {
        icon: GitCompareArrows,
        title: "Semantic Diff & Contract Checker",
        problem:
            "Frontend and backend drift out of sync — a field gets renamed or a type changes, and nobody notices until it breaks in production.",
        solution:
            "Paste your expected shape once, then check any real response against it in seconds. Catches breaking changes before your users do — a 20-minute manual diff becomes a 10-second check.",
    },
    {
        icon: FileText,
        title: "Health Score & Payload Optimizer",
        problem:
            "Nobody budgets time to review payload bloat or structural issues until an API is already slow in production.",
        solution:
            "Get a single 0-100 score plus concrete, ranked fixes — duplicate objects, oversized arrays, deep nesting — before it becomes a performance incident instead of after.",
    },
];

export function ProValueSection() {
    return (
        <div className="mt-16">
            <h2 className="text-center font-display text-2xl font-bold tracking-tight">What Pro actually solves</h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
                Free tools handle the basics. Pro is for the problems that don&apos;t show up until you&apos;re already
                shipping to real users.
            </p>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {proValueItems.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border bg-card/60 p-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                            <item.icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 font-display text-base font-semibold">{item.title}</h3>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            The problem
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.problem}</p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">What Pro does</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.solution}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
