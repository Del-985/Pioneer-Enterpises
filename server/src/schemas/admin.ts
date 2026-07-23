import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().max(120).default(""),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});

export const customerListSchema = paginationSchema.extend({
  status: z.enum(["ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
  sortBy: z.enum(["createdAt", "updatedAt", "lastName"]).default("updatedAt")
});

export const quoteListSchema = paginationSchema.extend({
  status: z.enum(["DRAFT", "SENT", "APPROVED", "DECLINED", "EXPIRED"]).optional(),
  assignedToId: z.string().trim().optional(),
  sortBy: z.enum(["createdAt", "updatedAt", "number", "total"]).default("createdAt")
});

export const serviceRequestListSchema = paginationSchema.extend({
  status: z.enum(["NEW", "REVIEWING", "SCHEDULED", "COMPLETED", "CANCELLED"]).optional(),
  assignedToId: z.string().trim().optional(),
  sortBy: z.enum(["createdAt", "updatedAt", "preferredDate"]).default("createdAt")
});

export const quoteUpdateSchema = z.object({
  status: z.enum(["DRAFT", "SENT", "APPROVED", "DECLINED", "EXPIRED"]).optional(),
  assignedToId: z.string().trim().min(1).nullable().optional(),
  internalNotes: z.string().trim().max(5000).nullable().optional()
}).refine((value) => Object.values(value).some((item) => item !== undefined), {
  message: "At least one field must be supplied."
});

export const serviceRequestUpdateSchema = z.object({
  status: z.enum(["NEW", "REVIEWING", "SCHEDULED", "COMPLETED", "CANCELLED"]).optional(),
  assignedToId: z.string().trim().min(1).nullable().optional(),
  internalNotes: z.string().trim().max(5000).nullable().optional()
}).refine((value) => Object.values(value).some((item) => item !== undefined), {
  message: "At least one field must be supplied."
});
