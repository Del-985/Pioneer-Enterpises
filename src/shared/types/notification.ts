import type { BusinessSlug } from "./business";

export type NotificationCategory =
  | "schedule"
  | "message"
  | "expense"
  | "estimate"
  | "system"
  | "customer";

export type NotificationPriority = "low" | "normal" | "high" | "urgent";

export interface AdminNotification {
  id: string;
  business?: BusinessSlug;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  archived: boolean;
  actionLabel?: string;
  actionPath?: string;
  sourceName?: string;
}
