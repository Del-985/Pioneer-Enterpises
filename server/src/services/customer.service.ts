import type { Prisma } from "@prisma/client";

import type { ContactInput } from "../schemas/public.js";

export async function resolveCustomer(
  database: Prisma.TransactionClient,
  input: ContactInput
) {
  const email = input.email.trim().toLowerCase();

  const existingCustomer = await database.customer.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive"
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  if (!existingCustomer) {
    return database.customer.create({
      data: {
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        companyName: input.companyName?.trim() || null,
        email,
        phone: input.phone.trim()
      }
    });
  }

  return database.customer.update({
    where: {
      id: existingCustomer.id
    },
    data: {
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      companyName: input.companyName?.trim() || existingCustomer.companyName,
      email,
      phone: input.phone.trim()
    }
  });
}
