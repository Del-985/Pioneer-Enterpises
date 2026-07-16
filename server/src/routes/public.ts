import { Router } from "express";
import { z } from "zod";

import { prisma } from "../lib/prisma.js";

const router = Router();

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  companyName: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(7).max(30)
});

const propertySchema = z.object({
  streetAddress: z.string().trim().min(1).max(160),
  city: z.string().trim().min(1).max(80),
  state: z.string().trim().min(2).max(40),
  postalCode: z.string().trim().min(3).max(20),
  accessNotes: z.string().trim().max(1000).optional().or(z.literal(""))
});

const quoteSchema = z.object({
  customer: contactSchema,
  property: propertySchema,
  serviceType: z.string().trim().min(1).max(120),
  description: z.string().trim().min(10).max(5000),
  preferredTiming: z.string().trim().max(120).optional().or(z.literal(""))
});

const serviceRequestSchema = z.object({
  customer: contactSchema,
  property: propertySchema,
  serviceType: z.string().trim().min(1).max(120),
  description: z.string().trim().min(10).max(5000),
  preferredDate: z.string().date().optional().or(z.literal("")),
  preferredWindow: z.string().trim().max(80).optional().or(z.literal(""))
});

async function createCustomerAndProperty(
  customerInput: z.infer<typeof contactSchema>,
  propertyInput: z.infer<typeof propertySchema>
) {
  return prisma.customer.create({
    data: {
      firstName: customerInput.firstName,
      lastName: customerInput.lastName,
      companyName: customerInput.companyName || null,
      email: customerInput.email,
      phone: customerInput.phone,
      properties: {
        create: {
          streetAddress: propertyInput.streetAddress,
          city: propertyInput.city,
          state: propertyInput.state,
          postalCode: propertyInput.postalCode,
          accessNotes: propertyInput.accessNotes || null
        }
      }
    },
    include: { properties: true }
  });
}

router.post("/quotes", async (request, response) => {
  const input = quoteSchema.parse(request.body);
  const customer = await createCustomerAndProperty(input.customer, input.property);
  const property = customer.properties[0];

  const quote = await prisma.quote.create({
    data: {
      number: `Q-${Date.now()}`,
      customerId: customer.id,
      propertyId: property?.id,
      title: input.serviceType,
      description: [input.description, input.preferredTiming ? `Preferred timing: ${input.preferredTiming}` : ""]
        .filter(Boolean)
        .join("\n")
    },
    select: { id: true, number: true, status: true, createdAt: true }
  });

  response.status(201).json({ quote });
});

router.post("/service-requests", async (request, response) => {
  const input = serviceRequestSchema.parse(request.body);
  const customer = await createCustomerAndProperty(input.customer, input.property);
  const property = customer.properties[0];

  const serviceRequest = await prisma.serviceRequest.create({
    data: {
      customerId: customer.id,
      propertyId: property?.id,
      serviceType: input.serviceType,
      description: input.description,
      preferredDate: input.preferredDate ? new Date(`${input.preferredDate}T12:00:00.000Z`) : null,
      preferredWindow: input.preferredWindow || null
    },
    select: { id: true, status: true, createdAt: true }
  });

  response.status(201).json({ serviceRequest });
});

export default router;
