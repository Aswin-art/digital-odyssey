import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const query = await prisma.game.findFirst({
      where: {
        id: params.id,
      },
      include: {
        gamePlayers: true,
        questions: true,
      },
    });

    if (!query) {
      return Response.json(
        { data: null, message: "Game not found!" },
        { status: 404 }
      );
    }

    query.gamePlayers.sort((a, b) => b.totalPoint - a.totalPoint);

    return Response.json({ data: query, message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("error when fetching all games", error);
    return Response.json({ data: null, message: error }, { status: 500 });
  }
}
