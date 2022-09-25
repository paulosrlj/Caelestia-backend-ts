/*
  Warnings:

  - You are about to drop the column `moduleId` on the `Achievement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[achievementId]` on the table `Module` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `achievementId` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_moduleId_fkey";

-- DropIndex
DROP INDEX "Achievement_moduleId_key";

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "moduleId";

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "achievementId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Module_achievementId_key" ON "Module"("achievementId");

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
