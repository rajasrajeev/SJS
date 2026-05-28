-- AlterTable
ALTER TABLE "DeductionMonthlyMaster" ADD COLUMN     "unrecover" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "unwanted" BOOLEAN NOT NULL DEFAULT false;
