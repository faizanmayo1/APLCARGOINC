import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import type { LoadRow } from "@/mocks/seed/loads";
import { Sparkles, Check, ArrowRight, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  load: LoadRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AIRecommendationDialog({ load, open, onOpenChange }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!load) return null;
  const recs = load.recommendations ?? [];
  const selected = recs.find((r) => r.id === selectedId) ?? recs.find((r) => r.preferred) ?? recs[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent width="max-w-2xl">
        <DialogHeader className="ai-edge rounded-t-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 text-[10px] font-medium uppercase tracking-[0.1em]">
              <Sparkles className="h-3 w-3" />
              AI recommendation
            </span>
            <StatusBadge status={load.status} />
          </div>
          <DialogTitle>
            {load.id} <span className="text-ink-muted font-normal"> · {load.origin} → {load.dest}</span>
          </DialogTitle>
          <DialogDescription>
            Predicted to arrive <span className="text-warning-700 font-medium">{load.predictedDelay}</span> late.
            {" "}Three options ranked by margin impact. One click executes — agent fires the customer ETA email and
            updates the TMS.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-1">
            <Stat label="Driver" value={load.driver} sub={load.unit} />
            <Stat label="Customer" value={load.customer} sub={`Revenue ${formatCurrencyShort(load.revenue)}`} />
            <Stat label="Predicted ETA delta" value={load.predictedDelay ?? "—"} sub="vs original commitment" warn />
          </div>

          <div className="mt-5 space-y-2">
            {recs.map((rec, i) => {
              const active = (selected?.id ?? null) === rec.id;
              const positive = rec.impact > 0;
              return (
                <button
                  key={rec.id}
                  onClick={() => setSelectedId(rec.id)}
                  className={cn(
                    "w-full text-left rounded-lg border p-4 transition-all",
                    active
                      ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/15"
                      : "border-border-soft bg-surface hover:border-border"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-7 w-7 shrink-0 rounded-md bg-subtle text-ink-muted grid place-items-center text-[12px] font-mono">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-body font-medium text-ink-primary">{rec.label}</h4>
                        {rec.preferred && (
                          <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-accent-700 bg-accent-50 px-1.5 py-0.5 rounded">
                            Preferred
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-body-sm text-ink-muted leading-relaxed">{rec.description}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-body-sm">
                        <Tag
                          icon={<DollarSign className="h-3 w-3" />}
                          label="Margin"
                          value={`${positive ? "+" : ""}${formatCurrencyShort(rec.impact)}`}
                          tone={positive ? "success" : "danger"}
                        />
                        {rec.saveMinutes != null && (
                          <Tag
                            icon={<Clock className="h-3 w-3" />}
                            label="ETA gain"
                            value={`${rec.saveMinutes}m`}
                            tone={rec.saveMinutes > 0 ? "success" : "neutral"}
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "h-5 w-5 rounded-full border-2 grid place-items-center shrink-0 transition-colors",
                        active ? "border-brand-500 bg-brand-500" : "border-border-strong"
                      )}
                    >
                      {active && <Check className="h-3 w-3 text-ink-invert" strokeWidth={3} />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </DialogBody>

        <DialogFooter>
          <Button variant="ghost" size="md" onClick={() => onOpenChange(false)}>
            Not now
          </Button>
          <Button variant="ai" size="md" disabled={!selected}>
            <Sparkles className="h-4 w-4" />
            Execute &amp; notify customer
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Stat({ label, value, sub, warn }: { label: string; value: string; sub?: string; warn?: boolean }) {
  return (
    <div className="rounded-lg bg-subtle/60 border border-border-soft p-3">
      <p className="text-caption uppercase tracking-[0.1em] text-ink-muted">{label}</p>
      <p className={cn("mt-0.5 text-body font-medium", warn ? "text-warning-700" : "text-ink-primary")}>
        {value}
      </p>
      {sub && <p className="text-[11px] text-ink-muted mt-0.5">{sub}</p>}
    </div>
  );
}

function Tag({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "success" | "danger" | "neutral";
}) {
  const cls =
    tone === "success"
      ? "text-success-700 bg-success-50"
      : tone === "danger"
      ? "text-danger-700 bg-danger-50"
      : "text-ink-secondary bg-subtle";
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[12px] font-medium", cls)}>
      {icon}
      <span className="opacity-70 mr-0.5">{label}</span>
      <span className="tabular-nums">{value}</span>
    </span>
  );
}

function formatCurrencyShort(n: number) {
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n)}`;
}
