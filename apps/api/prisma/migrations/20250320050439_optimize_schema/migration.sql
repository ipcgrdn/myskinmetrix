/*
  Warnings:

  - You are about to drop the column `profile` on the `User` table. All the data in the column will be lost.
  - Made the column `tempId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile",
ALTER COLUMN "tempId" SET NOT NULL;
