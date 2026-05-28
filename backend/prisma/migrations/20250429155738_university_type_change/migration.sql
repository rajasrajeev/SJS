/*
  Warnings:

  - You are about to alter the column `year` on the `EmployeeQualification` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "EmployeeQualification" ALTER COLUMN "year" SET DATA TYPE INTEGER,
ALTER COLUMN "university" SET DATA TYPE TEXT;
