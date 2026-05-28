/*
  Warnings:

  - You are about to alter the column `code` on the `Deduction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `acc_code` on the `Deduction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- CreateEnum
CREATE TYPE "DeductionCategory" AS ENUM ('FULLWITHOUTUNRECOVER', 'FULLWITHUNRECOVER', 'POSSIBLEWITHOUTUNRECOVER', 'POSSIBLEWITHUNRECOVER', 'MONTHLYSETTINGWITHOUTUNRECOVER', 'CHARTWITHOUTINTEREST', 'CHARTWITHINTEREST');

-- AlterTable
ALTER TABLE "Deduction" ADD COLUMN     "category" "DeductionCategory",
ALTER COLUMN "code" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "acc_code" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "installment_amt" DROP NOT NULL,
ALTER COLUMN "interest" DROP NOT NULL;

-- CreateTable
CREATE TABLE "DeductionMonth" (
    "id" SERIAL NOT NULL,
    "deduction_id" INTEGER NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DeductionMonth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeductionMonth_month_idx" ON "DeductionMonth"("month");

-- CreateIndex
CREATE INDEX "Deduction_code_idx" ON "Deduction"("code");

-- CreateIndex
CREATE INDEX "Deduction_acc_code_idx" ON "Deduction"("acc_code");

-- AddForeignKey
ALTER TABLE "DeductionMonth" ADD CONSTRAINT "DeductionMonth_deduction_id_fkey" FOREIGN KEY ("deduction_id") REFERENCES "Deduction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
