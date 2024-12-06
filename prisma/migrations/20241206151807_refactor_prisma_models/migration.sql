/*
  Warnings:

  - You are about to drop the `activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_contactId_fkey";

-- DropForeignKey
ALTER TABLE "contact" DROP CONSTRAINT "contact_customerId_fkey";

-- DropTable
DROP TABLE "activity";

-- DropTable
DROP TABLE "contact";

-- DropEnum
DROP TYPE "ActivityType";

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
