-- CreateTable
CREATE TABLE "PraticalLesson" (
    "id" TEXT NOT NULL,
    "lessonName" TEXT NOT NULL,
    "xpEarned" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "alternative1" TEXT NOT NULL,
    "alternative2" TEXT NOT NULL,
    "alternative3" TEXT NOT NULL,
    "alternative4" TEXT NOT NULL,
    "correctAlternative" INTEGER NOT NULL,
    "urlAlternative1" TEXT NOT NULL,
    "urlAlternative2" TEXT NOT NULL,
    "urlAlternative3" TEXT NOT NULL,
    "urlAlternative4" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "PraticalLesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PraticalLesson" ADD CONSTRAINT "PraticalLesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
