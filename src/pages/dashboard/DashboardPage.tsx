import { useState } from "react";
import { CalendarDays, Download, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardCaption, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/data-display/KPICard";
import { TrendChart } from "@/components/data-display/TrendChart";
import { LiveMap } from "@/components/map/LiveMap";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { AtRiskLoadsTable } from "@/features/dashboard/AtRiskLoadsTable";
import { ExceptionsPreview } from "@/features/dashboard/ExceptionsPreview";
import { CopilotPromptBar } from "@/features/dashboard/CopilotPromptBar";
import { AIRecommendationDialog } from "@/features/dashboard/AIRecommendationDialog";

import { KPIS } from "@/mocks/seed/kpis";
import { AT_RISK_LOADS, type LoadRow } from "@/mocks/seed/loads";
import { INSIGHTS } from "@/mocks/seed/insights";
import { EXCEPTION_PREVIEW } from "@/mocks/seed/exceptions";
import { TRUCKS } from "@/mocks/seed/trucks";
import { PERFORMANCE_30D } from "@/mocks/seed/performance";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [recOpen, setRecOpen] = useState(false);
  const [recLoad, setRecLoad] = useState<LoadRow | null>(null);

  const openRec = (l: LoadRow) => {
    setRecLoad(l);
    setRecOpen(true);
  };

  return (
    <div className="px-6 lg:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto space-y-6 reveal-stack">
      <PageHeader
        greeting="Monday · April 28 · 7:42 am"
        title="Good morning, Stefan."
        subtitle={
          <>
            Your fleet has <span className="text-success-700 font-medium">94.2%</span> on-time delivery this week.
            Three risks need a decision.
          </>
        }
        actions={
          <>
            <Button variant="secondary" size="md">
              <CalendarDays className="h-4 w-4" />
              Last 7 days
            </Button>
            <Button variant="secondary" size="icon" aria-label="Export">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ai" size="md">
              <Sparkles className="h-4 w-4" />
              AI weekly review
            </Button>
          </>
        }
      />

      {/* KPI strip */}
      <section
        aria-label="Key performance indicators"
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
      >
        {KPIS.map((k) => (
          <KPICard key={k.label} kpi={k} />
        ))}
      </section>

      {/* Map + insights */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardCaption>Live operations</CardCaption>
              <CardTitle className="mt-1">North America · 142 active units</CardTitle>
            </div>
            <Badge tone="success" dot size="sm">
              Live · updated 4s ago
            </Badge>
          </CardHeader>
          <div className="px-5 pb-5">
            <LiveMap trucks={TRUCKS} />
          </div>
        </Card>

        <Card className="xl:col-span-1 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <div>
              <CardCaption>AI insights</CardCaption>
              <CardTitle className="mt-1">
                {INSIGHTS.length} for review
              </CardTitle>
            </div>
            <Badge tone="accent" size="sm">
              {INSIGHTS.length} new
            </Badge>
          </CardHeader>
          <div className="px-3 pb-3 space-y-2 flex-1 overflow-y-auto">
            {INSIGHTS.map((i) => (
              <AIInsightCard key={i.id} insight={i} />
            ))}
          </div>
        </Card>
      </section>

      {/* At-risk + Performance */}
      <section className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <Card className="xl:col-span-3 overflow-hidden">
          <CardHeader className="flex flex-row items-end justify-between gap-3">
            <div>
              <CardCaption>At-risk loads</CardCaption>
              <CardTitle className="mt-1">5 loads need a decision now</CardTitle>
            </div>
            <button className="text-body-sm font-medium text-brand-600 hover:text-brand-700">
              View all loads →
            </button>
          </CardHeader>
          <AtRiskLoadsTable loads={AT_RISK_LOADS} onRecommend={openRec} />
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardCaption>Performance · 30 days</CardCaption>
            <CardTitle className="mt-1">Trends</CardTitle>
          </CardHeader>
          <div className="px-5 pb-5 grid grid-cols-2 gap-x-3 gap-y-4">
            <Mini label="On-time delivery" value="94.2%" delta="+1.4%" positive>
              <TrendChart
                data={PERFORMANCE_30D}
                xKey="day"
                series={[{ key: "otd", label: "OTD", color: "hsl(var(--success-500))" }]}
                height={70}
                hideAxis
                formatY={(v) => `${v.toFixed(0)}%`}
              />
            </Mini>
            <Mini label="Utilization" value="87.6%" delta="+2.1%" positive>
              <TrendChart
                data={PERFORMANCE_30D}
                xKey="day"
                series={[{ key: "util", label: "Util", color: "hsl(var(--brand-500))" }]}
                height={70}
                hideAxis
                formatY={(v) => `${v.toFixed(0)}%`}
              />
            </Mini>
            <Mini label="Cost per mile" value="$1.84" delta="-3.2%" positive>
              <TrendChart
                data={PERFORMANCE_30D}
                xKey="day"
                series={[{ key: "cost", label: "Cost", color: "hsl(var(--accent-500))" }]}
                height={70}
                hideAxis
              />
            </Mini>
            <Mini label="Profit margin" value="18.4%" delta="+0.8%" positive>
              <TrendChart
                data={PERFORMANCE_30D}
                xKey="day"
                series={[{ key: "margin", label: "Margin", color: "hsl(var(--warning-500))" }]}
                height={70}
                hideAxis
                formatY={(v) => `${v.toFixed(0)}%`}
              />
            </Mini>
          </div>
        </Card>
      </section>

      {/* Exceptions preview */}
      <section className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <Card className="xl:col-span-3 overflow-hidden">
          <CardHeader className="flex flex-row items-end justify-between gap-3">
            <div>
              <CardCaption>Exceptions</CardCaption>
              <CardTitle className="mt-1">
                3 of 7 awaiting human approval
              </CardTitle>
            </div>
            <button className="text-body-sm font-medium text-brand-600 hover:text-brand-700">
              See all (7) →
            </button>
          </CardHeader>
          <ExceptionsPreview rows={EXCEPTION_PREVIEW} />
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardCaption>Agentic workflows</CardCaption>
            <CardTitle className="mt-1">Auto-resolved today</CardTitle>
          </CardHeader>
          <div className="px-5 pb-5 space-y-2">
            <WorkflowRun name="Customer ETA notifications" count={42} time="continuous" />
            <WorkflowRun name="Detention auto-billing" count={6} time="last 4h" />
            <WorkflowRun name="Appointment rescheduling (EDI 990)" count={3} time="last 6h" />
            <WorkflowRun name="Driver HOS warnings" count={11} time="continuous" />
          </div>
        </Card>
      </section>

      {/* Copilot prompt bar */}
      <CopilotPromptBar />

      <AIRecommendationDialog load={recLoad} open={recOpen} onOpenChange={setRecOpen} />
    </div>
  );
}

function Mini({
  label,
  value,
  delta,
  positive,
  children,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-caption uppercase tracking-[0.1em] text-ink-muted">{label}</p>
      <div className="flex items-baseline gap-2 mt-0.5">
        <span className="text-kpi-sm tabular-nums text-ink-primary">{value}</span>
        <span
          className={`text-[11px] font-medium tabular-nums ${
            positive ? "text-success-700" : "text-danger-700"
          }`}
        >
          {delta}
        </span>
      </div>
      <div className="mt-1 -mx-1.5">{children}</div>
    </div>
  );
}

function WorkflowRun({ name, count, time }: { name: string; count: number; time: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
      <span className="text-body text-ink-secondary flex-1 truncate">{name}</span>
      <span className="text-body-sm font-mono tabular-nums text-ink-primary">×{count}</span>
      <span className="text-[11px] text-ink-muted w-20 text-right">{time}</span>
    </div>
  );
}
