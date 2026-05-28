/*
  Warnings:

  - You are about to drop the column `hours` on the `Shift` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DaysOfWeek" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "hours",
ADD COLUMN     "code" TEXT,
ADD COLUMN     "start_day" "DaysOfWeek";
