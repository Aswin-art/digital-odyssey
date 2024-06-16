/*
  Warnings:

  - A unique constraint covering the columns `[gameCode]` on the table `games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "games_gameCode_key" ON "games"("gameCode");
