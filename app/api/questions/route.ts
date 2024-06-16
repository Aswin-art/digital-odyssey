import prisma from "@/lib/prisma";
import { questionSchema } from "@/schemas/index.schema";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const gameCode = searchParams.get("gameCode");

  try {
    if (gameCode) {
      const getGameByCode = await prisma.game.findUnique({
        where: { gameCode },
      });

      if (!getGameByCode) {
        return Response.json(
          { data: null, message: "Game does not exists!" },
          { status: 404 }
        );
      } else {
        const query = await prisma.question.findMany({
          where: {
            gameId: getGameByCode.id,
          },
        });

        return Response.json({ data: query, message: "ok" }, { status: 200 });
      }
    }
  } catch (error) {
    return Response.json({ data: null, message: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const parseResult = questionSchema.safeParse(body);

  if (!parseResult.success) {
    return Response.json(
      { data: null, message: parseResult.error.errors },
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
      const query = await prisma.question.create({
        data: {
          gameId: getGameByCode?.id,
          content: body.content,
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
    return Response.json({ data: null, message: error }, { status: 500 });
  }
}
