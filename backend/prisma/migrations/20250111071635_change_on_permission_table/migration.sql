-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "menu_id" INTEGER,
ALTER COLUMN "sub_menu_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
