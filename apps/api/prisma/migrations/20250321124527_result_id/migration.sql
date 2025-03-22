/*
  Warnings:

  - You are about to drop the column `shareId` on the `Result` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Result_shareId_key";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "shareId";
