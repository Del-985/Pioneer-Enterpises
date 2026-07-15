import type { BusinessSlug } from "./business";

export type JobStatus =
  | "scheduled"
  | "in-progress"
  | "waiting"
  | "completed"
  | "cancelled";

export type JobPriority = "low" | "normal" | "high" | "urgent";

export interface JobChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface JobRecord {
  id: string;
  jobNumber: string;
  business: BusinessSlug;
  customerName: string;
  title: string;
  description: string;
  status: JobStatus;
  priority: JobPriority;
  scheduledDate: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  crew: string[];
  equipment: string[];
  estimateId?: string;
  estimatedValue: number;
  notes?: string;
  checklist: JobChecklistItem[];
  createdAt: string;
  updatedAt: string;
}
