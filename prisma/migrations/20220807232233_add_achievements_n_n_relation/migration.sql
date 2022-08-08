-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "achievementName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bonusPercentage" DOUBLE PRECISION NOT NULL,
    "bonusType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerAchievements" (
    "playerId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,

    CONSTRAINT "PlayerAchievements_pkey" PRIMARY KEY ("playerId","achievementId")
);

-- AddForeignKey
ALTER TABLE "PlayerAchievements" ADD CONSTRAINT "PlayerAchievements_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAchievements" ADD CONSTRAINT "PlayerAchievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
