-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('PAID', 'UNPAID');

-- AlterTable
ALTER TABLE "Leave" ADD COLUMN     "status" "LeaveStatus";
