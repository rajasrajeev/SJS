/*
  Warnings:

  - You are about to drop the column `eer` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esi_wages` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `pf_celling` on the `EmployeeStatutory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deduction" ALTER COLUMN "code" SET DATA TYPE TEXT,
ALTER COLUMN "acc_code" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "EmployeeStatutory" DROP COLUMN "eer",
DROP COLUMN "esi_wages",
DROP COLUMN "pf_celling",
ADD COLUMN     "edli_percent" DOUBLE PRECISION,
ADD COLUMN     "edli_percent_value" DOUBLE PRECISION,
ADD COLUMN     "edli_wages" DOUBLE PRECISION,
ADD COLUMN     "ee_value" DOUBLE PRECISION,
ADD COLUMN     "er" DOUBLE PRECISION,
ADD COLUMN     "er_value" DOUBLE PRECISION,
ADD COLUMN     "esic_celling_amt" DOUBLE PRECISION,
ADD COLUMN     "esic_ee" DOUBLE PRECISION,
ADD COLUMN     "esic_ee_value" DOUBLE PRECISION,
ADD COLUMN     "esic_er" DOUBLE PRECISION,
ADD COLUMN     "esic_er_value" DOUBLE PRECISION,
ADD COLUMN     "esic_percent_value" DOUBLE PRECISION,
ADD COLUMN     "pf_percent_value" DOUBLE PRECISION,
ADD COLUMN     "vpf_percent_value" DOUBLE PRECISION,
ALTER COLUMN "pf_percent" DROP NOT NULL,
ALTER COLUMN "vpf_percent" DROP NOT NULL,
ALTER COLUMN "pf_celling_amt" DROP NOT NULL,
ALTER COLUMN "esic_no" DROP NOT NULL,
ALTER COLUMN "esic_limit" DROP NOT NULL,
ALTER COLUMN "ee" DROP NOT NULL,
ALTER COLUMN "ee" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "esic_percent" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeWage" ADD COLUMN     "hra_value" DOUBLE PRECISION,
ADD COLUMN     "increment_percentage_value" DOUBLE PRECISION,
ADD COLUMN     "service_weightage_value" DOUBLE PRECISION,
ADD COLUMN     "ta_value" DOUBLE PRECISION,
ALTER COLUMN "basic2" DROP NOT NULL,
ALTER COLUMN "basic3" DROP NOT NULL,
ALTER COLUMN "basic4" DROP NOT NULL,
ALTER COLUMN "increment_percentage" DROP NOT NULL,
ALTER COLUMN "service_weightage" DROP NOT NULL,
ALTER COLUMN "hra" DROP NOT NULL,
ALTER COLUMN "ta" DROP NOT NULL;
