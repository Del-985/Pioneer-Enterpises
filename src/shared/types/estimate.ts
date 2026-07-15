import type { BusinessSlug } from "./business";

export type EstimateStatus =
  | "draft"
  | "sent"
  | "approved"
  | "declined"
  | "expired";

export interface EstimateLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Estimate {
  id: string;
  estimateNumber: string;
  business: BusinessSlug;
  customerName: string;
  customerEmail?: string;
  title: string;
  status: EstimateStatus;
  issuedDate: string;
  expirationDate: string;
  lineItems: EstimateLineItem[];
  discount: number;
  taxRate: number;
  notes?: string;
}

export interface EstimateTotals {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  total: number;
}

export function calculateEstimateTotals(
  estimate: Pick<Estimate, "lineItems" | "discount" | "taxRate">
): EstimateTotals {
  const subtotal = estimate.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const discountAmount = Math.min(Math.max(estimate.discount, 0), subtotal);
  const taxableAmount = Math.max(subtotal - discountAmount, 0);
  const taxAmount = taxableAmount * (Math.max(estimate.taxRate, 0) / 100);

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    taxAmount,
    total: taxableAmount + taxAmount
  };
}
