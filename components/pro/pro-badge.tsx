import { cn } from "@/lib/utils/cn";

interface ProBadgeProps {
    className?: string;
}

/**
 * Small "Pro" tag used anywhere a Pro-gated tool or feature is listed —
 * tool cards, nav mega menu, pricing table, feature grids. Keeping this as
 * one shared component means the Pro label always looks identical
 * everywhere it appears.
 */
export function ProBadge({ className }: ProBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary",
                className
            )}
        >
            Pro
        </span>
    );
}
