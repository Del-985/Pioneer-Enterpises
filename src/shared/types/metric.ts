import type { BusinessSlug } from "./business";

export type MetricPeriod = "7d" | "30d" | "90d" | "ytd";
export type MetricTrend = "up" | "down" | "flat";

export interface MetricValue {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  change: number;
  trend: MetricTrend;
  description: string;
}

export interface BusinessMetricSummary {
  business: BusinessSlug;
  revenue: number;
  expenses: number;
  jobsCompleted: number;
  estimatesSent: number;
  conversionRate: number;
  customerCount: number;
}

export interface MetricTrendPoint {
  label: string;
  value: number;
}
