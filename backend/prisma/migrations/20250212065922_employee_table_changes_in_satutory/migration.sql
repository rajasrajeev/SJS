/*
  Warnings:

  - The values [Advanced] on the enum `DaTypes` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `alt_mobile_no` on the `EmployeeAddress` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `EmployeeAddress` table. All the data in the column will be lost.
  - You are about to drop the column `mobile_no` on the `EmployeeAddress` table. All the data in the column will be lost.
  - You are about to alter the column `pf_no` on the `EmployeeStatutory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `uan_no` on the `EmployeeStatutory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `esic_no` on the `EmployeeStatutory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `mobile_no` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DaTypes_new" AS ENUM ('Master', 'Monthly', 'Advance');
ALTER TABLE "EmployeeWage" ALTER COLUMN "da_type" TYPE "DaTypes_new" USING ("da_type"::text::"DaTypes_new");
ALTER TYPE "DaTypes" RENAME TO "DaTypes_old";
ALTER TYPE "DaTypes_new" RENAME TO "DaTypes";
DROP TYPE "DaTypes_old";
COMMIT;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "alt_mobile_no" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "mobile_no" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeAddress" DROP COLUMN "alt_mobile_no",
DROP COLUMN "email",
DROP COLUMN "mobile_no";

-- AlterTable
ALTER TABLE "EmployeeStatutory" ALTER COLUMN "esic_establishment_code" SET DATA TYPE TEXT,
ALTER COLUMN "establishment_pf_code" SET DATA TYPE TEXT,
ALTER COLUMN "pf_no" SET DATA TYPE INTEGER,
ALTER COLUMN "uan_no" SET DATA TYPE INTEGER,
ALTER COLUMN "esic_no" SET DATA TYPE INTEGER;
