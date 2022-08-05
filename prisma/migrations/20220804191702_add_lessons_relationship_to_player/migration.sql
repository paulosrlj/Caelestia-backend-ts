-- CreateTable
CREATE TABLE "PraticalLessonsFinished" (
    "playerId" TEXT NOT NULL,
    "praticalLessonId" TEXT NOT NULL,

    CONSTRAINT "PraticalLessonsFinished_pkey" PRIMARY KEY ("playerId","praticalLessonId")
);

-- CreateTable
CREATE TABLE "TheoricLessonsFinished" (
    "playerId" TEXT NOT NULL,
    "theoricLessonId" TEXT NOT NULL,

    CONSTRAINT "TheoricLessonsFinished_pkey" PRIMARY KEY ("playerId","theoricLessonId")
);

-- AddForeignKey
ALTER TABLE "PraticalLessonsFinished" ADD CONSTRAINT "PraticalLessonsFinished_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PraticalLessonsFinished" ADD CONSTRAINT "PraticalLessonsFinished_praticalLessonId_fkey" FOREIGN KEY ("praticalLessonId") REFERENCES "PraticalLesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoricLessonsFinished" ADD CONSTRAINT "TheoricLessonsFinished_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoricLessonsFinished" ADD CONSTRAINT "TheoricLessonsFinished_theoricLessonId_fkey" FOREIGN KEY ("theoricLessonId") REFERENCES "TheoricLesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
