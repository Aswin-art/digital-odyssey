import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const gameCode = cookieStore.get("gameCode");

  try {
    if (gameCode) {
      const game = await prisma.game.findUnique({
        where: { gameCode: gameCode?.value },
      });

      if (game) {
        const questions = await prisma.question.findMany({
          where: {
            gameId: game.id,
          },
          include: {
            options: true,
          },
        });

        return Response.json(
          { data: questions, message: "ok" },
          { status: 200 }
        );
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
