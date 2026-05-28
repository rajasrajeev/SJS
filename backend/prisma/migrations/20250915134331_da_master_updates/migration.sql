-- CreateTable
CREATE TABLE "DaMonthlyShop" (
    "id" SERIAL NOT NULL,
    "shop_da_id" INTEGER NOT NULL,
    "da_point" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DaMonthlyShop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DaMonthlyFab" (
    "id" SERIAL NOT NULL,
    "fab_da_id" INTEGER NOT NULL,
    "da_point" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DaMonthlyFab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DaMonthlyIda" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DaMonthlyIda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DaMonthlyShop" ADD CONSTRAINT "DaMonthlyShop_shop_da_id_fkey" FOREIGN KEY ("shop_da_id") REFERENCES "ShopDaMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaMonthlyShop" ADD CONSTRAINT "DaMonthlyShop_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaMonthlyFab" ADD CONSTRAINT "DaMonthlyFab_fab_da_id_fkey" FOREIGN KEY ("fab_da_id") REFERENCES "FabDaMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaMonthlyFab" ADD CONSTRAINT "DaMonthlyFab_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaMonthlyIda" ADD CONSTRAINT "DaMonthlyIda_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
