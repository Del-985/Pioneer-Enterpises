import type { BusinessSlug } from "./business";

export type ScheduleEventStatus =
  | "requested"
  | "approved"
  | "scheduled"
  | "in-progress"
  | "completed"
  | "cancelled";

export type ScheduleEventKind =
  | "job"
  | "appointment"
  | "delivery"
  | "production"
  | "internal";

export interface ScheduleEvent {
  id: string;
  business: BusinessSlug;
  title: string;
  customerName?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  kind: ScheduleEventKind;
  status: ScheduleEventStatus;
  notes?: string;
}

export interface ScheduleRequest {
  id: string;
  business: BusinessSlug;
  customerName: string;
  requestedDate: string;
  requestedTime?: string;
  requestType: string;
  location?: string;
  submittedAt: string;
  status: "pending" | "approved" | "declined";
  notes?: string;
}
