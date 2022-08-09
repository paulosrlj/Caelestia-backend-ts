/*
  Warnings:

  - You are about to drop the column `additionalBonusPercentage` on the `PlayerAchievements` table. All the data in the column will be lost.
  - Added the required column `addBonusPercentagePerLevel` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelUpPrice` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "addBonusPercentagePerLevel" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "levelUpPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PlayerAchievements" DROP COLUMN "additionalBonusPercentage",
ADD COLUMN     "currentLevelUpPrice" INTEGER NOT NULL DEFAULT 0;
