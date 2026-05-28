/*
  Warnings:

  - You are about to drop the `DaPoint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DaPoint";

-- CreateTable
CREATE TABLE "ShopDaMaster" (
    "id" SERIAL NOT NULL,
    "category" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fixed" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ShopDaMaster_pkey" PRIMARY KEY ("id")
);
