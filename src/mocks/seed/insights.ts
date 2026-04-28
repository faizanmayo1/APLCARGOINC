export type Insight = {
  id: string;
  category: "disruption" | "maintenance" | "lane" | "driver" | "cost";
  headline: string;
  body: string;
  impact?: string;
  cta: string;
  href?: string;
  createdAt: string;
};

export const INSIGHTS: Insight[] = [
  {
    id: "i-1",
    category: "disruption",
    headline: "I-40 closure delaying Laredo–Memphis loads",
    body: "Three active loads on this lane are tracking 90+ minutes late. Re-routing via I-22 recovers 47 min and $112 margin per load.",
    impact: "+$336 if applied to all three",
    cta: "Apply re-route",
    createdAt: "7 min ago",
  },
  {
    id: "i-2",
    category: "maintenance",
    headline: "Unit #217 fuel efficiency down 14% this week",
    body: "Pattern is consistent with injector wear. Predicted failure window: 6–9 days. Memphis terminal is on the truck's natural Friday layover.",
    impact: "Avoid $4.2K roadside repair",
    cta: "Schedule maintenance",
    createdAt: "23 min ago",
  },
  {
    id: "i-3",
    category: "lane",
    headline: "Memphis hub detention up 23 min this month",
    body: "Average dwell at customer Walmart DC has crept from 41 to 64 minutes. Three drivers flagged HOS risk by week's end.",
    impact: "+18 min per load",
    cta: "Review lane",
    createdAt: "1 hr ago",
  },
  {
    id: "i-4",
    category: "cost",
    headline: "Fuel arbitrage opportunity — Loves 311 vs Pilot 248",
    body: "$0.21 / gal cheaper at Loves on the I-30 corridor for the next 36 hours. 18 of your trucks are routed within 15 mi.",
    impact: "$1,840 weekly saving",
    cta: "Update routing",
    createdAt: "2 hr ago",
  },
];
