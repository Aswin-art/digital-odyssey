/*
  Warnings:

  - Added the required column `gameCode` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "gameCode" TEXT NOT NULL;
