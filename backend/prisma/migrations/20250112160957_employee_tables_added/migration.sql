-- CreateTable
CREATE TABLE "EmployeeStatutory" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "pf_no" INTEGER NOT NULL,
    "pf_percent" DOUBLE PRECISION NOT NULL,
    "uan_no" INTEGER NOT NULL,
    "vpf_percent" DOUBLE PRECISION NOT NULL,
    "pf_celling_amt" DOUBLE PRECISION NOT NULL,
    "esi_wages" DOUBLE PRECISION NOT NULL,
    "pf_celling" DOUBLE PRECISION NOT NULL,
    "esic_no" INTEGER NOT NULL,
    "eer" INTEGER NOT NULL,
    "esic_limit" INTEGER NOT NULL,
    "ee" INTEGER NOT NULL,
    "esic_percent" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeStatutory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeLic" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "lic_no" INTEGER NOT NULL,
    "lic_amount" DOUBLE PRECISION NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeLic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeStatutory" ADD CONSTRAINT "EmployeeStatutory_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeLic" ADD CONSTRAINT "EmployeeLic_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
