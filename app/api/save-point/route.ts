import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const gameCode = cookieStore.get("gameCode");
  const playerName = cookieStore.get("playerName");

  const body = await req.json();

  try {
    if (gameCode && playerName) {
      const game = await prisma.game.findUnique({
        where: { gameCode: gameCode?.value },
      });

      if (game) {
        const gamePlayer = await prisma.gamePlayer.updateMany({
          data: {
            totalPoint: body.point,
          },
          where: {
            id: game.id,
            playerName: playerName.value,
          },
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
    }
  } catch (error) {
    return Response.json({ data: null, message: error }, { status: 500 });
  }
}
