/*
  Warnings:

  - You are about to drop the column `playername` on the `game_players` table. All the data in the column will be lost.
  - Added the required column `playerName` to the `game_players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game_players" DROP COLUMN "playername",
ADD COLUMN     "playerName" TEXT NOT NULL;
