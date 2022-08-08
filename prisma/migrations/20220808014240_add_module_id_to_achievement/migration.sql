/*
  Warnings:

  - A unique constraint covering the columns `[moduleId]` on the table `Achievement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `moduleId` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "moduleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_moduleId_key" ON "Achievement"("moduleId");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
