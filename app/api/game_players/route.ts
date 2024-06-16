import prisma from "@/lib/prisma";
import { gamePlayerSchema } from "@/schemas/index.schema";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const gameCode = searchParams.get("gameCode");

  try {
    if (gameCode) {
      const game = await prisma.game.findUnique({
        where: { gameCode },
        include: {
          gamePlayers: true,
          questions: {
            include: {
              options: true,
            },
          },
        },
      });
      return Response.json({ data: game, message: "ok" }, { status: 200 });
    }
  } catch (error) {
    return Response.json({ data: null, message: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const parseResult = gamePlayerSchema.safeParse(body);

  if (!parseResult.success) {
    return Response.json(
      {
        data: null,
        message: parseResult.error.errors,
      },
      { status: 400 }
    );
  }

  try {
    const getGameByCode = await prisma.game.findUnique({
      where: {
        gameCode: body.gameCode,
      },
    });

    if (!getGameByCode) {
      Response.json(
        { data: null, message: "Game does not exists!" },
        { status: 404 }
      );
    } else {
      const query = await prisma.gamePlayer.create({
        data: {
          gameId: getGameByCode?.id,
          playerName: body.playerName,
          playerNpm: body.playerNpm,
        },
      });

      return Response.json(
        {
          data: query,
          message: "ok",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
