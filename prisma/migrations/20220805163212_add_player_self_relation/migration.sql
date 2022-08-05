-- AlterTable
ALTER TABLE "PraticalLessonsFinished" ADD COLUMN     "completionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TheoricLessonsFinished" ADD COLUMN     "completionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "PlayerFriend" (
    "selfPlayerId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "PlayerFriend_pkey" PRIMARY KEY ("selfPlayerId","friendId")
);

-- AddForeignKey
ALTER TABLE "PlayerFriend" ADD CONSTRAINT "PlayerFriend_selfPlayerId_fkey" FOREIGN KEY ("selfPlayerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerFriend" ADD CONSTRAINT "PlayerFriend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
