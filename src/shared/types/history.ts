import type { BusinessSlug } from "./business";

export type HistoryCategory =
  | "customer"
  | "schedule"
  | "estimate"
  | "expense"
  | "form"
  | "system";

export type HistorySeverity = "info" | "success" | "warning" | "critical";

export interface HistoryRecord {
  id: string;
  business: BusinessSlug | "shared";
  category: HistoryCategory;
  severity: HistorySeverity;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  relatedLabel?: string;
  relatedPath?: string;
  metadata?: Record<string, string>;
}
