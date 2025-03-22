/*
  Warnings:

  - A unique constraint covering the columns `[shareId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "shareId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Result_shareId_key" ON "Result"("shareId");
