/*
  Warnings:

  - The values [WON,LOST] on the enum `OpportunityStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OpportunityStatus_new" AS ENUM ('OPEN', 'INPROGRESS', 'CLOSED', 'ONHOLD');
ALTER TABLE "opportunity" ALTER COLUMN "status" TYPE "OpportunityStatus_new" USING ("status"::text::"OpportunityStatus_new");
ALTER TYPE "OpportunityStatus" RENAME TO "OpportunityStatus_old";
ALTER TYPE "OpportunityStatus_new" RENAME TO "OpportunityStatus";
DROP TYPE "OpportunityStatus_old";
COMMIT;
