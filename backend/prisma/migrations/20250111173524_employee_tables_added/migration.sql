-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('MONTHLY', 'CONSOLIDATED', 'LABOUR', 'ADJUSTEDSALARY', 'MINIMUMTWENTYFIVEPERCENTSALARY');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('APOSITIVE', 'ANEGATIVE', 'BPOSITIVE', 'BNEGATIVE', 'OPOSITIVE', 'ONEGATIVE', 'ABPOSITIVE', 'ABNEGATIVE');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER,
    "pno" TEXT NOT NULL,
    "tno" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "blood_group" "BloodGroup" NOT NULL,
    "father_hus_name" TEXT NOT NULL,
    "spouse_name" TEXT NOT NULL,
    "nominee" TEXT NOT NULL,
    "permanent_address" TEXT NOT NULL,
    "temp_address" TEXT,
    "mob_no" TEXT NOT NULL,
    "alt_mob_no" TEXT NOT NULL,
    "join_trainee" TIMESTAMP(3) NOT NULL,
    "join_staff" TIMESTAMP(3) NOT NULL,
    "department_id" INTEGER NOT NULL,
    "designation_id" INTEGER NOT NULL,
    "retire_date" TIMESTAMP(3) NOT NULL,
    "retire_age" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeShift" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "shift_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeShift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeWage" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "basic1" DOUBLE PRECISION NOT NULL,
    "basic2" DOUBLE PRECISION NOT NULL,
    "basic3" DOUBLE PRECISION NOT NULL,
    "basic4" DOUBLE PRECISION NOT NULL,
    "increment_percentage" DOUBLE PRECISION NOT NULL,
    "service_weightage" DOUBLE PRECISION NOT NULL,
    "hra" DOUBLE PRECISION NOT NULL,
    "ta" DOUBLE PRECISION NOT NULL,
    "additional_increment" DOUBLE PRECISION NOT NULL,
    "production_increment" DOUBLE PRECISION NOT NULL,
    "medical" DOUBLE PRECISION NOT NULL,
    "washing_allowance" DOUBLE PRECISION NOT NULL,
    "da" DOUBLE PRECISION NOT NULL,
    "fda" DOUBLE PRECISION NOT NULL,
    "vda" DOUBLE PRECISION NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeWage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeCategory" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "salary_type" "SalaryType" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeBank" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "bank_name" TEXT NOT NULL,
    "branch_name" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,
    "account_no" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeBank_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "Designation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeShift" ADD CONSTRAINT "EmployeeShift_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeShift" ADD CONSTRAINT "EmployeeShift_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "Shift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeWage" ADD CONSTRAINT "EmployeeWage_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeCategory" ADD CONSTRAINT "EmployeeCategory_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeBank" ADD CONSTRAINT "EmployeeBank_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
