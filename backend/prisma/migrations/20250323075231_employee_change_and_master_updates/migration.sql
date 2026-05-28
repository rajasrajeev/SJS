/*
  Warnings:

  - You are about to drop the column `diff_percentage` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `edli_wages` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `employee_percentage` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_celling_amt` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_employee_percentage` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_employeer_percentage` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_establishment_code` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_total_percentage` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `establishment_pf_code` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `pension_percentage` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `pf_celling_amt` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `pf_total_percentage` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `ta` on the `EmployeeWage` table. All the data in the column will be lost.
  - You are about to drop the column `ta_value` on the `EmployeeWage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmployeeStatutory" DROP COLUMN "diff_percentage",
DROP COLUMN "edli_wages",
DROP COLUMN "employee_percentage",
DROP COLUMN "esic_celling_amt",
DROP COLUMN "esic_employee_percentage",
DROP COLUMN "esic_employeer_percentage",
DROP COLUMN "esic_establishment_code",
DROP COLUMN "esic_total_percentage",
DROP COLUMN "establishment_pf_code",
DROP COLUMN "pension_percentage",
DROP COLUMN "pf_celling_amt",
DROP COLUMN "pf_total_percentage",
ADD COLUMN     "is_esic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_pf" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lwf" TEXT,
ADD COLUMN     "other" TEXT,
ADD COLUMN     "pf_amount" DOUBLE PRECISION,
ALTER COLUMN "vpf_percentage" DROP NOT NULL,
ALTER COLUMN "pf_no" DROP NOT NULL,
ALTER COLUMN "uan_no" DROP NOT NULL,
ALTER COLUMN "esic_no" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeWage" DROP COLUMN "ta",
DROP COLUMN "ta_value",
ADD COLUMN     "ltc" DOUBLE PRECISION,
ADD COLUMN     "ltc_value" DOUBLE PRECISION,
ADD COLUMN     "medical_allowance_value" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "washing_allowance_value" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ALTER COLUMN "da" DROP NOT NULL,
ALTER COLUMN "fda" DROP NOT NULL,
ALTER COLUMN "vda" DROP NOT NULL,
ALTER COLUMN "da_type" DROP NOT NULL;

-- CreateTable
CREATE TABLE "MasterPf" (
    "id" SERIAL NOT NULL,
    "pf_total_percentage" DOUBLE PRECISION NOT NULL,
    "employee_percentage" DOUBLE PRECISION NOT NULL,
    "pension_percentage" DOUBLE PRECISION NOT NULL,
    "diff_percentage" DOUBLE PRECISION NOT NULL,
    "pf_celling_amt" DOUBLE PRECISION NOT NULL,
    "edli_wages" DOUBLE PRECISION NOT NULL,
    "establishment_pf_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "MasterPf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterEsic" (
    "id" SERIAL NOT NULL,
    "esic_total_percentage" DOUBLE PRECISION NOT NULL,
    "employee_percentage" DOUBLE PRECISION NOT NULL,
    "employer_percentage" DOUBLE PRECISION NOT NULL,
    "establishment_code" TEXT NOT NULL,
    "esic_celling_amt" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "MasterEsic_pkey" PRIMARY KEY ("id")
);
