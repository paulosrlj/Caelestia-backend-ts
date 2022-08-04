/*
  Warnings:

  - You are about to drop the `TheoricLessonImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TheoricLessonImage" DROP CONSTRAINT "TheoricLessonImage_theoricLessonId_fkey";

-- DropTable
DROP TABLE "TheoricLessonImage";
