-- CreateTable
CREATE TABLE "ClassroomPlayers" (
    "playerId" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,

    CONSTRAINT "ClassroomPlayers_pkey" PRIMARY KEY ("playerId","classroomId")
);

-- AddForeignKey
ALTER TABLE "ClassroomPlayers" ADD CONSTRAINT "ClassroomPlayers_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomPlayers" ADD CONSTRAINT "ClassroomPlayers_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
