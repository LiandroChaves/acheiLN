-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "city_name" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT,
ALTER COLUMN "address" DROP NOT NULL;
