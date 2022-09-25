/*
  Warnings:

  - You are about to drop the column `weeklyPoints` on the `PlayerRanking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "rankingPoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PlayerRanking" DROP COLUMN "weeklyPoints";
