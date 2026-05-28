/*
  Warnings:

  - You are about to drop the column `notes` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the `_UserPermissions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `icon` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `SubMenu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `SubMenu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserPermissions" DROP CONSTRAINT "_UserPermissions_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserPermissions" DROP CONSTRAINT "_UserPermissions_B_fkey";

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "notes",
ADD COLUMN     "function_name" TEXT;

-- AlterTable
ALTER TABLE "SubMenu" ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "_StaffBranches" ADD CONSTRAINT "_StaffBranches_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_StaffBranches_AB_unique";

-- DropTable
DROP TABLE "_UserPermissions";

-- CreateTable
CREATE TABLE "UserPermission" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "UserPermission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
