/*
  Warnings:

  - Changed the type of `amount` on the `Deduction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `installment_amt` on the `Deduction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `interest` on the `Deduction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Deduction" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL,
DROP COLUMN "installment_amt",
ADD COLUMN     "installment_amt" INTEGER NOT NULL,
DROP COLUMN "interest",
ADD COLUMN     "interest" INTEGER NOT NULL;
