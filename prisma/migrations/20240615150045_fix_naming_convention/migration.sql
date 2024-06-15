/*
  Warnings:

  - You are about to drop the column `player_name` on the `game_players` table. All the data in the column will be lost.
  - You are about to drop the column `player_npm` on the `game_players` table. All the data in the column will be lost.
  - You are about to drop the column `total_point` on the `game_players` table. All the data in the column will be lost.
  - You are about to drop the column `intro_video` on the `games` table. All the data in the column will be lost.
  - Added the required column `playerNpm` to the `game_players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playername` to the `game_players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPoint` to the `game_players` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "game_players" DROP CONSTRAINT "game_players_gameId_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_userId_fkey";

-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_questionId_fkey";

-- AlterTable
ALTER TABLE "game_players" DROP COLUMN "player_name",
DROP COLUMN "player_npm",
DROP COLUMN "total_point",
ADD COLUMN     "playerNpm" TEXT NOT NULL,
ADD COLUMN     "playername" TEXT NOT NULL,
ADD COLUMN     "totalPoint" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "games" DROP COLUMN "intro_video",
ADD COLUMN     "introVideo" TEXT;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_players" ADD CONSTRAINT "game_players_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
