import {
  AlertTriangle,
  ArrowRight,
  Wrench,
  TrendingUp,
  Coins,
  Truck as TruckIcon,
  Sparkles,
} from "lucide-react";
import type { Insight } from "@/mocks/seed/insights";
import { cn } from "@/lib/utils";

const ICON: Record<Insight["category"], React.ComponentType<{ className?: string; strokeWidth?: number | string }>> = {
  disruption: AlertTriangle,
  maintenance: Wrench,
  lane: TrendingUp,
  driver: TruckIcon,
  cost: Coins,
};

const CATEGORY_TONE: Record<Insight["category"], string> = {
  disruption: "text-warning-700 bg-warning-50",
  maintenance: "text-danger-700 bg-danger-50",
  lane: "text-brand-700 bg-brand-50",
  driver: "text-ink-secondary bg-subtle",
  cost: "text-success-700 bg-success-50",
};

export function AIInsightCard({ insight, onAct }: { insight: Insight; onAct?: () => void }) {
  const Icon = ICON[insight.category];
  return (
    <article className="group ai-edge relative rounded-lg bg-surface p-3.5 transition-colors hover:bg-subtle/60">
      <div className="flex items-start gap-3">
        <div className={cn("h-8 w-8 shrink-0 rounded-md grid place-items-center", CATEGORY_TONE[insight.category])}>
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-caption uppercase tracking-[0.1em] text-accent-700 inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> AI insight
            </span>
            <span className="text-[11px] text-ink-muted">· {insight.createdAt}</span>
          </div>
          <h4 className="mt-1 text-body font-medium text-ink-primary leading-snug">{insight.headline}</h4>
          <p className="mt-1 text-body-sm text-ink-muted leading-relaxed">{insight.body}</p>
          <div className="mt-2.5 flex items-center justify-between gap-3">
            {insight.impact ? (
              <span className="text-[11px] font-medium text-success-700 tabular-nums">{insight.impact}</span>
            ) : (
              <span />
            )}
            <button
              onClick={onAct}
              className="inline-flex items-center gap-1 text-body-sm font-medium text-brand-600 hover:text-brand-700"
            >
              {insight.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
