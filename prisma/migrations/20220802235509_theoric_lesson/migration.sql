-- CreateTable
CREATE TABLE "TheoricLesson" (
    "id" TEXT NOT NULL,
    "lessonName" TEXT NOT NULL,
    "xpEarned" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "TheoricLesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TheoricLesson" ADD CONSTRAINT "TheoricLesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
