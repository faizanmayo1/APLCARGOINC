import type { KPI } from "@/components/data-display/KPICard";

const trend = (start: number, drift: number, jitter: number, n = 24) =>
  Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const noise = (Math.sin(i * 1.7) + Math.cos(i * 2.3)) * jitter;
    return start + drift * t + noise;
  });

export const KPIS: KPI[] = [
  {
    label: "On-time delivery",
    value: 94.2,
    format: "percent",
    delta: -1.4,
    trend: trend(95, -1, 0.6),
    annotation: "Down 1.4% — I-40 closure on Laredo–Memphis",
  },
  {
    label: "Fleet utilization",
    value: 87.6,
    format: "percent",
    delta: 2.1,
    trend: trend(85, 2, 0.5),
    annotation: "+2.1% vs last week — driver pool expanded",
  },
  {
    label: "Cost per mile",
    value: 1.84,
    format: "currency",
    delta: -3.2,
    invertedDelta: true,
    trend: trend(1.95, -0.1, 0.04),
    annotation: "$0.06 saved per mile after fuel re-routing",
  },
  {
    label: "Active loads",
    value: 248,
    format: "number",
    delta: 4.6,
    trend: trend(230, 16, 4),
    annotation: "12 at risk · 3 critical · 233 nominal",
  },
  {
    label: "Open exceptions",
    value: 7,
    format: "number",
    delta: -22.0,
    invertedDelta: true,
    trend: trend(12, -5, 1.5),
    annotation: "7 open · agent auto-resolved 14 today",
  },
  {
    label: "Profit margin",
    value: 18.4,
    format: "percent",
    delta: 0.8,
    trend: trend(17, 1.4, 0.4),
    annotation: "Margin lift driven by reefer lane optimization",
  },
];
