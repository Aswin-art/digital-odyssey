import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const gameCode = cookieStore.get("gameCode");
  const playerName = cookieStore.get("playerName");

  try {
    if (gameCode) {
      const game = await prisma.game.findUnique({
        where: { gameCode: gameCode?.value },
      });

      if (game) {
        const gamePlayer = await prisma.gamePlayer.findFirst({
          where: { gameId: game.id, playerName: playerName?.value },
        });

        if (gamePlayer) {
          return Response.json(
            { data: gamePlayer, message: "ok" },
            { status: 200 }
          );
        }
      } else {
        return Response.json(
          { data: null, message: "Game not found!" },
          { status: 404 }
        );
      }
    } else {
      return Response.json(
        { data: null, message: "No gameCode provided!" },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json({ data: null, message: error }, { status: 500 });
  }
}
