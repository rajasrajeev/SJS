-- CreateTable
CREATE TABLE "DeductionMonthlyMaster" (
    "id" SERIAL NOT NULL,
    "deduction_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "department_id" INTEGER,
    "month" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DeductionMonthlyMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeductionEmployeeMonthlyMaster" (
    "id" SERIAL NOT NULL,
    "deduction_monthly_master_id" INTEGER NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "deduction_amt" DOUBLE PRECISION NOT NULL,
    "installment_amt" DOUBLE PRECISION,
    "interest_percentage" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DeductionEmployeeMonthlyMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeductionMonthlyMonthly" (
    "id" SERIAL NOT NULL,
    "deduction_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "department_id" INTEGER,
    "month" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DeductionMonthlyMonthly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeductionEmployeeMonthlyMonthly" (
    "id" SERIAL NOT NULL,
    "deduction_monthly_monthly_id" INTEGER NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "deduction_amt" DOUBLE PRECISION NOT NULL,
    "installment_amt" DOUBLE PRECISION,
    "interest_percentage" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DeductionEmployeeMonthlyMonthly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeductionMonthlyAdvance" (
    "id" SERIAL NOT NULL,
    "deduction_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "department_id" INTEGER,
    "month" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DeductionMonthlyAdvance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeductionEmployeeMonthlyAdvance" (
    "id" SERIAL NOT NULL,
    "deduction_monthly_advance_id" INTEGER NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "deduction_amt" DOUBLE PRECISION NOT NULL,
    "installment_amt" DOUBLE PRECISION,
    "interest_percentage" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DeductionEmployeeMonthlyAdvance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionWages" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "designation_id" INTEGER NOT NULL,
    "worked_designation_id" INTEGER NOT NULL,
    "days_worked" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "PromotionWages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NightAllowanceMonthly" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "night_allowance_id" INTEGER,
    "designation_id" INTEGER NOT NULL,
    "night_worked" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "NightAllowanceMonthly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OvertimeWagesMonthly" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "overtime_id" INTEGER,
    "designation_id" INTEGER NOT NULL,
    "overtime_worked" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "OvertimeWagesMonthly_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeductionMonthlyMaster" ADD CONSTRAINT "DeductionMonthlyMaster_deduction_id_fkey" FOREIGN KEY ("deduction_id") REFERENCES "Deduction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionMonthlyMaster" ADD CONSTRAINT "DeductionMonthlyMaster_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionMonthlyMaster" ADD CONSTRAINT "DeductionMonthlyMaster_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionEmployeeMonthlyMaster" ADD CONSTRAINT "DeductionEmployeeMonthlyMaster_deduction_monthly_master_id_fkey" FOREIGN KEY ("deduction_monthly_master_id") REFERENCES "DeductionMonthlyMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionEmployeeMonthlyMaster" ADD CONSTRAINT "DeductionEmployeeMonthlyMaster_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionMonthlyMonthly" ADD CONSTRAINT "DeductionMonthlyMonthly_deduction_id_fkey" FOREIGN KEY ("deduction_id") REFERENCES "Deduction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionMonthlyMonthly" ADD CONSTRAINT "DeductionMonthlyMonthly_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionMonthlyMonthly" ADD CONSTRAINT "DeductionMonthlyMonthly_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionEmployeeMonthlyMonthly" ADD CONSTRAINT "DeductionEmployeeMonthlyMonthly_deduction_monthly_monthly__fkey" FOREIGN KEY ("deduction_monthly_monthly_id") REFERENCES "DeductionMonthlyMonthly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionEmployeeMonthlyMonthly" ADD CONSTRAINT "DeductionEmployeeMonthlyMonthly_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionMonthlyAdvance" ADD CONSTRAINT "DeductionMonthlyAdvance_deduction_id_fkey" FOREIGN KEY ("deduction_id") REFERENCES "Deduction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionMonthlyAdvance" ADD CONSTRAINT "DeductionMonthlyAdvance_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionMonthlyAdvance" ADD CONSTRAINT "DeductionMonthlyAdvance_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionEmployeeMonthlyAdvance" ADD CONSTRAINT "DeductionEmployeeMonthlyAdvance_deduction_monthly_advance__fkey" FOREIGN KEY ("deduction_monthly_advance_id") REFERENCES "DeductionMonthlyAdvance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeductionEmployeeMonthlyAdvance" ADD CONSTRAINT "DeductionEmployeeMonthlyAdvance_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionWages" ADD CONSTRAINT "PromotionWages_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionWages" ADD CONSTRAINT "PromotionWages_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "Designation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionWages" ADD CONSTRAINT "PromotionWages_worked_designation_id_fkey" FOREIGN KEY ("worked_designation_id") REFERENCES "Designation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NightAllowanceMonthly" ADD CONSTRAINT "NightAllowanceMonthly_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NightAllowanceMonthly" ADD CONSTRAINT "NightAllowanceMonthly_night_allowance_id_fkey" FOREIGN KEY ("night_allowance_id") REFERENCES "NightAllowance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NightAllowanceMonthly" ADD CONSTRAINT "NightAllowanceMonthly_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "Designation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OvertimeWagesMonthly" ADD CONSTRAINT "OvertimeWagesMonthly_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OvertimeWagesMonthly" ADD CONSTRAINT "OvertimeWagesMonthly_overtime_id_fkey" FOREIGN KEY ("overtime_id") REFERENCES "Overtime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OvertimeWagesMonthly" ADD CONSTRAINT "OvertimeWagesMonthly_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "Designation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
