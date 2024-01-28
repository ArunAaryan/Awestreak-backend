/*
  Warnings:

  - You are about to drop the column `descripiton` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "descripiton",
ADD COLUMN     "description" TEXT;
