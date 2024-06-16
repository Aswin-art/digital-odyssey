import prisma from "@/lib/prisma";
import { optionArraySchema } from "@/schemas/index.schema";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const questionId = searchParams.get("questionId");

  try {
    if (questionId) {
      const question = await prisma.question.findUnique({
        where: { id: questionId },
      });

      if (!question) {
        return Response.json(
          { data: null, message: "Question does not exists!" },
          { status: 404 }
        );
      } else {
        const options = await prisma.option.findMany({
          where: { questionId: questionId },
        });

        return Response.json({ data: options, message: "ok" }, { status: 200 });
      }
    }
  } catch (error) {
    return Response.json({ data: null, message: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const parseResult = optionArraySchema.safeParse(body);

  if (!parseResult.success) {
    return Response.json(
      { data: null, message: parseResult.error.errors },
      { status: 400 }
    );
  }

  try {
    const savedOptions = await prisma.option.createMany({
      data: parseResult.data.map((option) => ({
        questionId: option.questionId,
        content: option.content,
        isCorrect: option.isCorrect,
      })),
    });

    return Response.json(
      { data: savedOptions, message: "ok" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ data: null, message: error }, { status: 500 });
  }
}
