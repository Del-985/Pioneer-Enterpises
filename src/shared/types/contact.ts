import type { BusinessSlug } from "./business";

export type ContactCategory =
  | "vendor"
  | "employee"
  | "contractor"
  | "partner"
  | "government"
  | "other";

export type ContactStatus = "active" | "inactive";

export interface ContactRecord {
  id: string;
  business: BusinessSlug | "shared";
  firstName: string;
  lastName: string;
  company?: string;
  title?: string;
  category: ContactCategory;
  status: ContactStatus;
  email?: string;
  phone?: string;
  secondaryPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type NewContactInput = Omit<
  ContactRecord,
  "id" | "createdAt" | "updatedAt"
>;
