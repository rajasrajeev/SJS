-- CreateEnum
CREATE TYPE "MonthlyAttendanceStatusCode" AS ENUM ('P', 'A', 'W', 'CL', 'EL', 'HOL', 'H');

-- CreateTable
CREATE TABLE "EarningMonthlyMaster" (
    "id" SERIAL NOT NULL,
    "earning_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "department_id" INTEGER,
    "month" TIMESTAMP(3) NOT NULL,
    "unwanted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EarningMonthlyMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarningEmployeeMonthlyMaster" (
    "id" SERIAL NOT NULL,
    "earning_monthly_master_id" INTEGER NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "earning_amt" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EarningEmployeeMonthlyMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarningMonthlyMonthly" (
    "id" SERIAL NOT NULL,
    "earning_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "department_id" INTEGER,
    "month" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EarningMonthlyMonthly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarningEmployeeMonthlyMonthly" (
    "id" SERIAL NOT NULL,
    "earning_monthly_monthly_id" INTEGER NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "earning_amt" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EarningEmployeeMonthlyMonthly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyManualAttendanceHeader" (
    "id" SERIAL NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "MonthlyManualAttendanceHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyManualAttendanceDay" (
    "id" SERIAL NOT NULL,
    "monthly_manual_attendance_header_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "day_no" INTEGER NOT NULL,
    "status_code" "MonthlyAttendanceStatusCode" NOT NULL DEFAULT 'P',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "MonthlyManualAttendanceDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EarningEmployeeMonthlyMaster_earning_monthly_master_id_emp__key" ON "EarningEmployeeMonthlyMaster"("earning_monthly_master_id", "emp_id");

-- CreateIndex
CREATE UNIQUE INDEX "EarningEmployeeMonthlyMonthly_earning_monthly_monthly_id_em_key" ON "EarningEmployeeMonthlyMonthly"("earning_monthly_monthly_id", "emp_id");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyManualAttendanceHeader_month_year_key" ON "MonthlyManualAttendanceHeader"("month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyManualAttendanceDay_monthly_manual_attendance_header_key" ON "MonthlyManualAttendanceDay"("monthly_manual_attendance_header_id", "employee_id", "day_no");

-- AddForeignKey
ALTER TABLE "EarningMonthlyMaster" ADD CONSTRAINT "EarningMonthlyMaster_earning_id_fkey" FOREIGN KEY ("earning_id") REFERENCES "Earnings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningMonthlyMaster" ADD CONSTRAINT "EarningMonthlyMaster_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningMonthlyMaster" ADD CONSTRAINT "EarningMonthlyMaster_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningEmployeeMonthlyMaster" ADD CONSTRAINT "EarningEmployeeMonthlyMaster_earning_monthly_master_id_fkey" FOREIGN KEY ("earning_monthly_master_id") REFERENCES "EarningMonthlyMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningEmployeeMonthlyMaster" ADD CONSTRAINT "EarningEmployeeMonthlyMaster_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningMonthlyMonthly" ADD CONSTRAINT "EarningMonthlyMonthly_earning_id_fkey" FOREIGN KEY ("earning_id") REFERENCES "Earnings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningMonthlyMonthly" ADD CONSTRAINT "EarningMonthlyMonthly_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningMonthlyMonthly" ADD CONSTRAINT "EarningMonthlyMonthly_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningEmployeeMonthlyMonthly" ADD CONSTRAINT "EarningEmployeeMonthlyMonthly_earning_monthly_monthly_id_fkey" FOREIGN KEY ("earning_monthly_monthly_id") REFERENCES "EarningMonthlyMonthly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningEmployeeMonthlyMonthly" ADD CONSTRAINT "EarningEmployeeMonthlyMonthly_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyManualAttendanceDay" ADD CONSTRAINT "MonthlyManualAttendanceDay_monthly_manual_attendance_heade_fkey" FOREIGN KEY ("monthly_manual_attendance_header_id") REFERENCES "MonthlyManualAttendanceHeader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyManualAttendanceDay" ADD CONSTRAINT "MonthlyManualAttendanceDay_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
