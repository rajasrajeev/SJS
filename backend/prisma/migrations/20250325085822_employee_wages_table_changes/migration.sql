/*
  Warnings:

  - You are about to drop the column `production_increment` on the `EmployeeWage` table. All the data in the column will be lost.
  - You are about to drop the column `production_increment_value` on the `EmployeeWage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmployeeWage" DROP COLUMN "production_increment",
DROP COLUMN "production_increment_value",
ADD COLUMN     "other_allowance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "other_allowance_value" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "production_incentive" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "production_incentive_value" DOUBLE PRECISION DEFAULT 0.0,
ALTER COLUMN "increment_percentage" SET DEFAULT 0.0,
ALTER COLUMN "service_weightage" SET DEFAULT 0.0,
ALTER COLUMN "hra" SET DEFAULT 0.0,
ALTER COLUMN "washing_allowance" SET DEFAULT 0.0,
ALTER COLUMN "hra_value" SET DEFAULT 0.0,
ALTER COLUMN "increment_percentage_value" SET DEFAULT 0.0,
ALTER COLUMN "service_weightage_value" SET DEFAULT 0.0,
ALTER COLUMN "attendance_incentive" SET DEFAULT 0.0,
ALTER COLUMN "attendance_incentive_value" SET DEFAULT 0.0,
ALTER COLUMN "basic5" SET DEFAULT 0.0,
ALTER COLUMN "basic6" SET DEFAULT 0.0,
ALTER COLUMN "medical_allowance" SET DEFAULT 0.0,
ALTER COLUMN "travel_allowance_percentage" SET DEFAULT 0.0,
ALTER COLUMN "travel_allowance_value" SET DEFAULT 0.0,
ALTER COLUMN "ltc" SET DEFAULT 0.0,
ALTER COLUMN "ltc_value" SET DEFAULT 0.0;
