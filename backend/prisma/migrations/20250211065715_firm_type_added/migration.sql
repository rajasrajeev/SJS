-- CreateEnum
CREATE TYPE "FirmType" AS ENUM ('SHOP', 'FAB', 'OTHER');

-- AlterTable
ALTER TABLE "Firm" ADD COLUMN     "firm_type" "FirmType";
