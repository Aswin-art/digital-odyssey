import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const gameCode = cookieStore.get("gameCode");
  const playerName = cookieStore.get("playerName");

  const searchParams = req.nextUrl.searchParams;
  const point = searchParams.get("point");

  const parsedPoint = Number(point);

  try {
    if (gameCode && playerName) {
      const game = await prisma.game.findUnique({
        where: { gameCode: gameCode?.value },
      });

      if (game) {
        const gamePlayer = await prisma.gamePlayer.updateMany({
          data: {
            totalPoint: parsedPoint,
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
