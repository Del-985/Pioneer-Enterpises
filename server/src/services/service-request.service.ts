import { prisma } from "../lib/prisma.js";
import type { ServiceRequestInput } from "../schemas/public.js";
import { resolveCustomer } from "./customer.service.js";
import { resolveProperty } from "./property.service.js";

export async function createPublicServiceRequest(input: ServiceRequestInput) {
  return prisma.$transaction(async (transaction) => {
    const customer = await resolveCustomer(transaction, input.customer);
    const property = await resolveProperty(
      transaction,
      customer.id,
      input.property
    );

    return transaction.serviceRequest.create({
      data: {
        customerId: customer.id,
        propertyId: property.id,
        serviceType: input.serviceType,
        description: input.description,
        preferredDate: input.preferredDate
          ? new Date(`${input.preferredDate}T12:00:00.000Z`)
          : null,
        preferredWindow: input.preferredWindow || null
      },
      select: {
        id: true,
        status: true,
        createdAt: true
      }
    });
  });
}
