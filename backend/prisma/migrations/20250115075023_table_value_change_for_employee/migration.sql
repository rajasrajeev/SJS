/*
  Warnings:

  - A unique constraint covering the columns `[emp_id]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[esic_no]` on the table `EmployeeStatutory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "DeductionType" ADD VALUE 'Advance';

-- AlterTable
ALTER TABLE "EmployeeStatutory" ALTER COLUMN "pf_no" SET DATA TYPE TEXT,
ALTER COLUMN "uan_no" SET DATA TYPE TEXT,
ALTER COLUMN "esic_no" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_emp_id_key" ON "Employee"("emp_id");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeStatutory_esic_no_key" ON "EmployeeStatutory"("esic_no");
