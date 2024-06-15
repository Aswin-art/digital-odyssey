/*
  Warnings:

  - You are about to drop the column `currentHealth` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `currentScore` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `questionText` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the `answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `results` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_questionId_fkey";

-- DropForeignKey
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_itemId_fkey";

-- DropForeignKey
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_userId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_userId_fkey";

-- DropIndex
DROP INDEX "games_userId_key";

-- AlterTable
ALTER TABLE "games" DROP COLUMN "currentHealth",
DROP COLUMN "currentScore",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "intro_video" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "questionText",
ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "answers";

-- DropTable
DROP TABLE "inventories";

-- DropTable
DROP TABLE "items";

-- DropTable
DROP TABLE "results";

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_players" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "player_name" TEXT NOT NULL,
    "player_npm" TEXT NOT NULL,
    "total_point" TEXT NOT NULL,

    CONSTRAINT "game_players_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_players" ADD CONSTRAINT "game_players_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
