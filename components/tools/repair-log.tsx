import { CheckCircle2, Wrench, AlertTriangle } from "lucide-react";
import type { JsonRepairStep, JsonValidationError } from "@/lib/json/types";

export function RepairLog({
  steps,
  remainingError,
}: {
  steps: JsonRepairStep[];
  remainingError?: JsonValidationError;
}) {
  if (steps.length === 0 && !remainingError) {
    return (
      <div className="flex items-center gap-2 px-4 py-6 text-sm text-muted-foreground">
        <Wrench className="h-4 w-4" />
        Paste broken JSON and click Repair to see a step-by-step fix log here.
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-start gap-3 px-4 py-3">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          <div>
            <p className="text-sm font-medium">
              {i + 1}. {step.label}{" "}
              <span className="font-mono text-xs font-normal text-muted-foreground">
                ({step.count} {step.count === 1 ? "fix" : "fixes"})
              </span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
      {remainingError && (
        <div className="flex items-start gap-3 bg-destructive/5 px-4 py-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
          <div>
            <p className="text-sm font-medium text-destructive">
              Couldn&apos;t fully repair — line {remainingError.position.line}, column {remainingError.position.column}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{remainingError.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
