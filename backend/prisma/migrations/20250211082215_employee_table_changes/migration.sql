/*
  Warnings:

  - You are about to drop the column `alt_mob_no` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `father_hus_name` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `mob_no` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `permanent_address` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `retire_age` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `temp_address` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `edli_percent` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `edli_percent_value` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `ee` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `ee_value` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `er` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `er_value` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_ee` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_ee_value` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_er` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_er_value` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_limit` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_percent` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `esic_percent_value` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `pf_percent` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `pf_percent_value` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `vpf_percent` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `vpf_percent_value` on the `EmployeeStatutory` table. All the data in the column will be lost.
  - You are about to drop the column `additional_increment` on the `EmployeeWage` table. All the data in the column will be lost.
  - You are about to drop the column `medical` on the `EmployeeWage` table. All the data in the column will be lost.
  - Added the required column `age` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diff_percentage` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_percentage` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `esic_employee_percentage` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `esic_employeer_percentage` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `esic_establishment_code` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `esic_total_percentage` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `establishment_pf_code` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pension_percentage` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pf_total_percentage` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vpf_percentage` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `pf_no` on the `EmployeeStatutory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `uan_no` on the `EmployeeStatutory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `pf_celling_amt` on table `EmployeeStatutory` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `esic_no` to the `EmployeeStatutory` table without a default value. This is not possible if the table is not empty.
  - Made the column `edli_wages` on table `EmployeeStatutory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `esic_celling_amt` on table `EmployeeStatutory` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `attendance_incentive` to the `EmployeeWage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `da_type` to the `EmployeeWage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medical_allowance` to the `EmployeeWage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travel_allowance_percentage` to the `EmployeeWage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DaTypes" AS ENUM ('Master', 'Monthly', 'Advanced');

-- DropIndex
DROP INDEX "EmployeeStatutory_esic_no_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "alt_mob_no",
DROP COLUMN "father_hus_name",
DROP COLUMN "mob_no",
DROP COLUMN "permanent_address",
DROP COLUMN "retire_age",
DROP COLUMN "temp_address",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "father_name" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "religion" TEXT,
ADD COLUMN     "week_off" TEXT,
ALTER COLUMN "tno" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeStatutory" DROP COLUMN "edli_percent",
DROP COLUMN "edli_percent_value",
DROP COLUMN "ee",
DROP COLUMN "ee_value",
DROP COLUMN "er",
DROP COLUMN "er_value",
DROP COLUMN "esic_ee",
DROP COLUMN "esic_ee_value",
DROP COLUMN "esic_er",
DROP COLUMN "esic_er_value",
DROP COLUMN "esic_limit",
DROP COLUMN "esic_percent",
DROP COLUMN "esic_percent_value",
DROP COLUMN "pf_percent",
DROP COLUMN "pf_percent_value",
DROP COLUMN "vpf_percent",
DROP COLUMN "vpf_percent_value",
ADD COLUMN     "diff_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "employee_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "esic_employee_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "esic_employeer_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "esic_establishment_code" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "esic_total_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "establishment_pf_code" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pension_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pf_total_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vpf_percentage" DOUBLE PRECISION NOT NULL,
DROP COLUMN "pf_no",
ADD COLUMN     "pf_no" DOUBLE PRECISION NOT NULL,
DROP COLUMN "uan_no",
ADD COLUMN     "uan_no" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "pf_celling_amt" SET NOT NULL,
DROP COLUMN "esic_no",
ADD COLUMN     "esic_no" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "edli_wages" SET NOT NULL,
ALTER COLUMN "esic_celling_amt" SET NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeWage" DROP COLUMN "additional_increment",
DROP COLUMN "medical",
ADD COLUMN     "attendance_incentive" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "attendance_incentive_value" DOUBLE PRECISION,
ADD COLUMN     "basic5" DOUBLE PRECISION,
ADD COLUMN     "basic6" DOUBLE PRECISION,
ADD COLUMN     "da_type" "DaTypes" NOT NULL,
ADD COLUMN     "medical_allowance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "production_increment_value" DOUBLE PRECISION,
ADD COLUMN     "travel_allowance_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "travel_allowance_value" DOUBLE PRECISION,
ALTER COLUMN "salary" DROP NOT NULL;

-- CreateTable
CREATE TABLE "EmployeeAddress" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "house_name" TEXT NOT NULL,
    "house_no" TEXT NOT NULL,
    "street_name" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "mobile_no" TEXT NOT NULL,
    "alt_mobile_no" TEXT,
    "email" TEXT,
    "country_id" INTEGER,
    "state_id" INTEGER,
    "district_id" INTEGER,
    "is_permanent" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeQualification" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "qualification" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "year" DOUBLE PRECISION NOT NULL,
    "university" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeQualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeExperience" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "firm_name" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "joining_date" TIMESTAMP(3) NOT NULL,
    "resigning_date" TIMESTAMP(3),
    "designation" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeExperience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeAddress" ADD CONSTRAINT "EmployeeAddress_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAddress" ADD CONSTRAINT "EmployeeAddress_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAddress" ADD CONSTRAINT "EmployeeAddress_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAddress" ADD CONSTRAINT "EmployeeAddress_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeQualification" ADD CONSTRAINT "EmployeeQualification_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeExperience" ADD CONSTRAINT "EmployeeExperience_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
