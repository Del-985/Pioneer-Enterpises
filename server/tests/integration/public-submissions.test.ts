import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { app } from "../../src/app.js";
import { prisma } from "../../src/lib/prisma.js";

const customer = {
  firstName: "Avery",
  lastName: "Parker",
  companyName: "Parker Properties",
  email: "avery@example.com",
  phone: "504-555-0123"
};

const property = {
  streetAddress: "101 Pioneer Lane",
  city: "New Orleans",
  state: "LA",
  postalCode: "70112"
};

async function clearDatabase() {
  await prisma.$transaction([
    prisma.job.deleteMany(),
    prisma.quoteItem.deleteMany(),
    prisma.quote.deleteMany(),
    prisma.serviceRequest.deleteMany(),
    prisma.property.deleteMany(),
    prisma.contact.deleteMany(),
    prisma.customer.deleteMany()
  ]);
}

beforeEach(clearDatabase);

afterAll(async () => {
  await clearDatabase();
  await prisma.$disconnect();
});

describe("public submissions", () => {
  it("creates a quote with its customer and property", async () => {
    const response = await request(app)
      .post("/api/public/quotes")
      .send({
        customer,
        property,
        serviceType: "Pressure Washing",
        description: "Clean the driveway and rear patio thoroughly.",
        preferredTiming: "Within two weeks"
      });

    expect(response.status).toBe(201);
    expect(response.body.quote).toMatchObject({
      status: "DRAFT"
    });
    expect(response.body.quote.number).toMatch(/^Q-\d{4}-[A-F0-9]{8}$/);

    const quote = await prisma.quote.findUnique({
      where: { id: response.body.quote.id },
      include: { customer: true, property: true }
    });

    expect(quote?.customer.email).toBe(customer.email);
    expect(quote?.property?.streetAddress).toBe(property.streetAddress);
    expect(quote?.description).toContain("Preferred timing: Within two weeks");
  });

  it("reuses a customer and property across public submissions", async () => {
    const quoteResponse = await request(app)
      .post("/api/public/quotes")
      .send({
        customer,
        property,
        serviceType: "Landscaping",
        description: "Refresh the planting beds around the front entrance."
      });

    expect(quoteResponse.status).toBe(201);

    const serviceResponse = await request(app)
      .post("/api/public/service-requests")
      .send({
        customer: { ...customer, email: "AVERY@EXAMPLE.COM" },
        property: { ...property, streetAddress: " 101  Pioneer Lane " },
        serviceType: "Lawn Maintenance",
        description: "Mow, edge, and clear debris from the lawn.",
        preferredDate: "2026-08-15",
        preferredWindow: "Morning"
      });

    expect(serviceResponse.status).toBe(201);
    await expect(prisma.customer.count()).resolves.toBe(1);
    await expect(prisma.property.count()).resolves.toBe(1);
    await expect(prisma.quote.count()).resolves.toBe(1);
    await expect(prisma.serviceRequest.count()).resolves.toBe(1);
  });

  it("rejects invalid submissions without writing records", async () => {
    const response = await request(app)
      .post("/api/public/service-requests")
      .send({
        customer: { ...customer, email: "not-an-email" },
        property,
        serviceType: "Pressure Washing",
        description: "Too short"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed.");
    await expect(prisma.customer.count()).resolves.toBe(0);
    await expect(prisma.serviceRequest.count()).resolves.toBe(0);
  });
});
