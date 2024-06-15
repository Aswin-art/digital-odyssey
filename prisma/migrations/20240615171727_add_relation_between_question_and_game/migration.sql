/*
  Warnings:

  - The `totalPoint` column on the `game_players` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `gameId` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game_players" DROP COLUMN "totalPoint",
ADD COLUMN     "totalPoint" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "gameId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
