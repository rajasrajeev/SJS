/*
  Warnings:

  - You are about to drop the column `week_off` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "week_off",
ALTER COLUMN "photo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeShift" ADD COLUMN     "week_off" TEXT;
