/*
  Warnings:

  - Added the required column `department_id` to the `Designation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effective_date` to the `Designation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Designation" ADD COLUMN     "basic" TEXT,
ADD COLUMN     "department_id" INTEGER NOT NULL,
ADD COLUMN     "effective_date" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
