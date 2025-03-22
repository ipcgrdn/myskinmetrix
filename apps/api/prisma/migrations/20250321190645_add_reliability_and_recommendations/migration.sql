/*
  Warnings:

  - Added the required column `recommendations` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reliability` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "recommendations" JSONB NOT NULL,
ADD COLUMN     "reliability" JSONB NOT NULL;
