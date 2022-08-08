/*
  Warnings:

  - Added the required column `achievementLevel` to the `PlayerAchievements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `additionalBonusPercentage` to the `PlayerAchievements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerAchievements" ADD COLUMN     "achievementLevel" INTEGER NOT NULL,
ADD COLUMN     "additionalBonusPercentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "isEquiped" BOOLEAN NOT NULL DEFAULT false;
