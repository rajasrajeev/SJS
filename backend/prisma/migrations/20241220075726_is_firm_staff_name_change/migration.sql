/*
  Warnings:

  - You are about to drop the column `id_firm_staff` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "id_firm_staff",
ADD COLUMN     "is_firm_staff" BOOLEAN NOT NULL DEFAULT false;
