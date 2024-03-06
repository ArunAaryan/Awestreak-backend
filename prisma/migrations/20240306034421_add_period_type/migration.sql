-- CreateEnum
CREATE TYPE "Period" AS ENUM ('MONTHLY', 'EVERYDAY', 'WEEKLY');

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "period" "Period";
