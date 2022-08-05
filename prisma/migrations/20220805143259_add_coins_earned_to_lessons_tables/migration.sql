/*
  Warnings:

  - Added the required column `coinsEarned` to the `PraticalLesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coinsEarned` to the `TheoricLesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PraticalLesson" ADD COLUMN     "coinsEarned" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TheoricLesson" ADD COLUMN     "coinsEarned" INTEGER NOT NULL;
