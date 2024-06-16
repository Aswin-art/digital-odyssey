import prisma from "@/lib/prisma";
import { generateRandomCode } from "@/lib/generateRandomCode";
import { gameSchema } from "@/schemas/index.schema";
import { auth } from "@/auth";

// get all games
export async function GET(req: Request) {
  try {
    const query = await prisma.game.findMany();
    return Response.json({ data: query, message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("error when fetching all games", error);
    return Response.json({ data: null, message: error }, { status: 500 });
  }
}

// create new games
export async function POST(req: Request) {
  try {
    const user = await auth();
    const body = await req.json();
    body.classCode = await generateRandomCode();
    body.userId = user?.user?.id;

    const parseResult = gameSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        {
          data: null,
          message: parseResult.error.errors,
        },
        { status: 400 }
      );
    }

    const query = await prisma.game.create({
      data: {
        title: body.title,
        gameCode: body.gameCode,
        description: body.description ?? "",
        introVideo: body.introVideo ?? "",
        userId: body.userId,
      },
    });

    return Response.json({ data: query, message: "ok" }, { status: 201 });
  } catch (error) {
    return Response.json({ data: null, message: error }, { status: 500 });
  }
}
