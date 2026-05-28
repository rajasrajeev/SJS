-- CreateEnum
CREATE TYPE "DeductionType" AS ENUM ('Master', 'Monthly');

-- CreateEnum
CREATE TYPE "EarningsType" AS ENUM ('Master');

-- CreateTable
CREATE TABLE "Deduction" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "acc_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DeductionType" NOT NULL,
    "amount" TEXT NOT NULL,
    "installment_amt" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Deduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Earnings" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "acc_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EarningsType" NOT NULL,
    "effect_pf" BOOLEAN NOT NULL DEFAULT false,
    "effect_csi" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Earnings_pkey" PRIMARY KEY ("id")
);
