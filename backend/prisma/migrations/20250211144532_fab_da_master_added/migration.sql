-- CreateTable
CREATE TABLE "FabDaMaster" (
    "id" SERIAL NOT NULL,
    "category" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deduction" TEXT NOT NULL,
    "rate_per_da" TEXT NOT NULL,
    "rate_of_point" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "FabDaMaster_pkey" PRIMARY KEY ("id")
);
