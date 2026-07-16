import { randomUUID } from "node:crypto";

import { prisma } from "../lib/prisma.js";
import type { QuoteInput } from "../schemas/public.js";
import { resolveCustomer } from "./customer.service.js";
import { resolveProperty } from "./property.service.js";

function createQuoteNumber() {
  const year = new Date().getUTCFullYear();
  return `Q-${year}-${randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function createPublicQuote(input: QuoteInput) {
  return prisma.$transaction(async (transaction) => {
    const customer = await resolveCustomer(transaction, input.customer);
    const property = await resolveProperty(
      transaction,
      customer.id,
      input.property
    );

    const description = [
      input.description,
      input.preferredTiming
        ? `Preferred timing: ${input.preferredTiming}`
        : ""
    ]
      .filter(Boolean)
      .join("\n");

    const quote = await transaction.quote.create({
      data: {
        number: createQuoteNumber(),
        customerId: customer.id,
        propertyId: property.id,
        title: input.serviceType,
        description
      },
      select: {
        id: true,
        number: true,
        status: true,
        createdAt: true
      }
    });

    return quote;
  });
}
