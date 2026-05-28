-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "retired" BOOLEAN NOT NULL DEFAULT false;
