-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "branch_status" "FirmStatus",
ADD COLUMN     "fdb_no" TEXT,
ADD COLUMN     "gst_no" TEXT,
ADD COLUMN     "incorporation_no" TEXT,
ADD COLUMN     "other_license" TEXT,
ADD COLUMN     "reg_no" TEXT,
ADD COLUMN     "start_date" TIMESTAMP(3),
ADD COLUMN     "trade_lic_no" TEXT,
ADD COLUMN     "web" TEXT;
