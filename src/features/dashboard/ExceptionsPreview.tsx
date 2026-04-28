import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ExceptionRow } from "@/mocks/seed/exceptions";

const TONE: Record<ExceptionRow["severity"], "danger" | "warning" | "info"> = {
  critical: "danger",
  warning: "warning",
  info: "info",
};

export function ExceptionsPreview({ rows }: { rows: ExceptionRow[] }) {
  return (
    <ul className="divide-y divide-border-soft">
      {rows.map((r) => (
        <li key={r.id} className="flex items-center gap-3 px-5 py-3 hover:bg-subtle/40 transition-colors group cursor-pointer">
          <Badge tone={TONE[r.severity]} dot size="sm">
            {r.severity}
          </Badge>
          <div className="flex-1 min-w-0">
            <p className="text-body-sm text-ink-primary truncate">{r.title}</p>
            <p className="text-[11px] text-ink-muted mt-0.5">
              <span className="font-mono">{r.load}</span>
              <span className="mx-1.5">·</span>
              {r.driver}
              <span className="mx-1.5">·</span>
              {r.age} ago
            </p>
          </div>
          <div className="hidden md:block text-body-sm text-ink-secondary max-w-[200px] truncate">
            {r.resolution}
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 text-body-sm text-brand-600 hover:text-brand-700 px-2 py-1 rounded-md">
            Resolve
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
