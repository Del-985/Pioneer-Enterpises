ALTER TABLE "Quote" ADD COLUMN "assignedToId" TEXT;
ALTER TABLE "Quote" ADD COLUMN "internalNotes" TEXT;
ALTER TABLE "ServiceRequest" ADD COLUMN "assignedToId" TEXT;
ALTER TABLE "ServiceRequest" ADD COLUMN "internalNotes" TEXT;

CREATE INDEX "Quote_status_createdAt_idx" ON "Quote"("status", "createdAt");
CREATE INDEX "Quote_assignedToId_idx" ON "Quote"("assignedToId");
CREATE INDEX "ServiceRequest_status_createdAt_idx" ON "ServiceRequest"("status", "createdAt");
CREATE INDEX "ServiceRequest_assignedToId_idx" ON "ServiceRequest"("assignedToId");

ALTER TABLE "Quote" ADD CONSTRAINT "Quote_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
