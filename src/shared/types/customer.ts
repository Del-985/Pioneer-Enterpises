import type { BusinessSlug } from "./business";

export type CustomerStatus = "lead" | "active" | "inactive" | "archived";

export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface CustomerActivity {
  id: string;
  date: string;
  description: string;
}

export interface Customer {
  id: string;
  business: BusinessSlug;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  status: CustomerStatus;
  address?: CustomerAddress;
  notes?: string;
  jobCount: number;
  estimateCount: number;
  serviceRequestCount?: number;
  lastActivityAt?: string;
  activity: CustomerActivity[];
}
