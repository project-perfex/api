-- AlterTable
ALTER TABLE "order_product" ALTER COLUMN "total" DROP DEFAULT,
ALTER COLUMN "total" SET DATA TYPE DOUBLE PRECISION;
