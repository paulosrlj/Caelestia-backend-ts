-- CreateTable
CREATE TABLE "TheoricLessonImage" (
    "id" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL,
    "theoricLessonId" TEXT NOT NULL,

    CONSTRAINT "TheoricLessonImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TheoricLessonImage" ADD CONSTRAINT "TheoricLessonImage_theoricLessonId_fkey" FOREIGN KEY ("theoricLessonId") REFERENCES "TheoricLesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
