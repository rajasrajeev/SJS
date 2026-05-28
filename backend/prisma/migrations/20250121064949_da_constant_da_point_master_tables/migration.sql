-- CreateEnum
CREATE TYPE "DaCategory" AS ENUM ('SHOP', 'FACTORY');

-- CreateTable
CREATE TABLE "DaConstant" (
    "id" SERIAL NOT NULL,
    "district_id" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DaConstant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DaPoint" (
    "id" SERIAL NOT NULL,
    "category" "DaCategory" NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DaPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DaConstant" ADD CONSTRAINT "DaConstant_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;
