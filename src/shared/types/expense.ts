import type { BusinessSlug } from "./business";

export type ExpenseStatus = "pending" | "approved" | "paid" | "rejected";

export type ExpenseCategory =
  | "equipment"
  | "fuel"
  | "materials"
  | "maintenance"
  | "insurance"
  | "marketing"
  | "payroll"
  | "utilities"
  | "other";

export interface Expense {
  id: string;
  business: BusinessSlug;
  vendor: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  status: ExpenseStatus;
  expenseDate: string;
  paymentMethod?: string;
  referenceNumber?: string;
  notes?: string;
  receiptAttached: boolean;
  createdAt: string;
}

export interface ExpenseDraft {
  business: BusinessSlug;
  vendor: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  expenseDate: string;
  paymentMethod: string;
  referenceNumber: string;
  notes: string;
  receiptAttached: boolean;
}
