/*
  Warnings:

  - Added the required column `address` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_no` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_id` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contact_no" TEXT NOT NULL,
ADD COLUMN     "country_id" INTEGER,
ADD COLUMN     "district_id" INTEGER,
ADD COLUMN     "email_id" TEXT NOT NULL,
ADD COLUMN     "state_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;
