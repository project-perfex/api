/*
  Warnings:

  - You are about to drop the column `total` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "total";

-- AlterTable
ALTER TABLE "order_product" ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 1;
