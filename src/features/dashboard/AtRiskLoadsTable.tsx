import { Sparkles, ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import type { LoadRow } from "@/mocks/seed/loads";
import { cn } from "@/lib/utils";

type Props = {
  loads: LoadRow[];
  onRecommend: (load: LoadRow) => void;
};

export function AtRiskLoadsTable({ loads, onRecommend }: Props) {
  return (
    <div className="overflow-hidden">
      <table className="w-full text-body">
        <thead>
          <tr className="text-left text-caption uppercase text-ink-muted tracking-[0.08em]">
            <th className="font-medium px-5 py-2.5">Load</th>
            <th className="font-medium px-3 py-2.5">Lane</th>
            <th className="font-medium px-3 py-2.5">Driver</th>
            <th className="font-medium px-3 py-2.5">Status</th>
            <th className="font-medium px-3 py-2.5 text-right">Predicted ETA</th>
            <th className="font-medium px-3 py-2.5 text-right">Revenue</th>
            <th className="font-medium px-5 py-2.5 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {loads.map((l, i) => (
            <tr
              key={l.id}
              className={cn(
                "border-t border-border-soft transition-colors group hover:bg-subtle/50",
                i === 0 && "border-t-0"
              )}
            >
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[13px] text-ink-primary">{l.id}</span>
                </div>
                <div className="text-[11px] text-ink-muted mt-0.5">{l.unit} · {l.customer}</div>
              </td>
              <td className="px-3 py-3 text-ink-secondary text-body-sm">
                <span className="text-ink-primary">{originCode(l.origin)}</span>
                <span className="mx-1.5 text-ink-disabled">→</span>
                <span className="text-ink-primary">{originCode(l.dest)}</span>
              </td>
              <td className="px-3 py-3 text-ink-secondary text-body-sm">{l.driver}</td>
              <td className="px-3 py-3">
                <StatusBadge status={l.status} />
              </td>
              <td className="px-3 py-3 text-right">
                <span className={cn(
                  "font-mono text-body-sm tabular-nums font-medium",
                  l.status === "delayed" ? "text-danger-700" : "text-warning-700"
                )}>
                  {l.predictedDelay}
                </span>
              </td>
              <td className="px-3 py-3 text-right text-ink-primary font-mono text-body-sm tabular-nums">
                ${(l.revenue / 1000).toFixed(1)}K
              </td>
              <td className="px-5 py-3 text-right">
                {l.recommendations?.length ? (
                  <button
                    onClick={() => onRecommend(l)}
                    className="inline-flex items-center gap-1 text-body-sm font-medium text-accent-700 hover:text-accent-700 px-2 py-1 rounded-md hover:bg-accent-50 transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    AI recommend
                  </button>
                ) : (
                  <button className="inline-flex items-center gap-1 text-body-sm text-ink-muted hover:text-ink-primary px-2 py-1 rounded-md hover:bg-subtle transition-colors">
                    Open
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function originCode(s: string) {
  const map: Record<string, string> = {
    "Atlanta, GA": "ATL",
    "Memphis, TN": "MEM",
    "Los Angeles, CA": "LAX",
    "Phoenix, AZ": "PHX",
    "Dallas, TX": "DFW",
    "Houston, TX": "HOU",
    "Seattle, WA": "SEA",
    "Portland, OR": "PDX",
    "Chicago, IL": "ORD",
    "Detroit, MI": "DTW",
  };
  return map[s] ?? s.slice(0, 3).toUpperCase();
}
