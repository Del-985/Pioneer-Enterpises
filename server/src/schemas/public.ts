import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  companyName: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(7).max(30)
});

export const propertySchema = z.object({
  streetAddress: z.string().trim().min(1).max(160),
  city: z.string().trim().min(1).max(80),
  state: z.string().trim().min(2).max(40),
  postalCode: z.string().trim().min(3).max(20),
  accessNotes: z.string().trim().max(1000).optional().or(z.literal(""))
});

export const quoteSchema = z.object({
  customer: contactSchema,
  property: propertySchema,
  serviceType: z.string().trim().min(1).max(120),
  description: z.string().trim().min(10).max(5000),
  preferredTiming: z.string().trim().max(120).optional().or(z.literal(""))
});

export const serviceRequestSchema = z.object({
  customer: contactSchema,
  property: propertySchema,
  serviceType: z.string().trim().min(1).max(120),
  description: z.string().trim().min(10).max(5000),
  preferredDate: z.string().date().optional().or(z.literal("")),
  preferredWindow: z.string().trim().max(80).optional().or(z.literal(""))
});

export type ContactInput = z.infer<typeof contactSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
