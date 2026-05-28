-- CreateEnum
CREATE TYPE "OvertimeType" AS ENUM ('Single', 'Double', 'Triple');

-- AlterTable
ALTER TABLE "NightAllowance" ALTER COLUMN "code" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Overtime" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "base_amount" TEXT NOT NULL,
    "code" TEXT,
    "overtime_type" "OvertimeType" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Overtime_pkey" PRIMARY KEY ("id")
);
