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

        if (questions) {
          const randomIndex = Math.floor(Math.random() * questions.length);

          const randomQuestion = questions[randomIndex];

          return Response.json(
            { data: randomQuestion, message: "ok" },
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
