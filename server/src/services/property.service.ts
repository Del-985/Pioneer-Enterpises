import type { Prisma } from "@prisma/client";

import type { PropertyInput } from "../schemas/public.js";

function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export async function resolveProperty(
  database: Prisma.TransactionClient,
  customerId: string,
  input: PropertyInput
) {
  const streetAddress = normalizeWhitespace(input.streetAddress);
  const city = normalizeWhitespace(input.city);
  const state = normalizeWhitespace(input.state).toUpperCase();
  const postalCode = normalizeWhitespace(input.postalCode).toUpperCase();
  const accessNotes = input.accessNotes?.trim() || null;

  const existingProperty = await database.property.findFirst({
    where: {
      customerId,
      streetAddress: {
        equals: streetAddress,
        mode: "insensitive"
      },
      city: {
        equals: city,
        mode: "insensitive"
      },
      state: {
        equals: state,
        mode: "insensitive"
      },
      postalCode: {
        equals: postalCode,
        mode: "insensitive"
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  if (!existingProperty) {
    return database.property.create({
      data: {
        customerId,
        streetAddress,
        city,
        state,
        postalCode,
        accessNotes
      }
    });
  }

  return database.property.update({
    where: {
      id: existingProperty.id
    },
    data: {
      streetAddress,
      city,
      state,
      postalCode,
      accessNotes: accessNotes ?? existingProperty.accessNotes
    }
  });
}
