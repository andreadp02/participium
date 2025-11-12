/*
  Warnings:

  - Added the required column `status` to the `report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "reportStatus" AS ENUM ('PENDING_APPROVAL', 'ASSIGNED', 'IN_PROGRESS', 'SUSPENDED', 'REJECTED', 'RESOLVED');

-- AlterTable
ALTER TABLE "report" ADD COLUMN     "status" "reportStatus" NOT NULL;
