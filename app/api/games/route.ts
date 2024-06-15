import prisma from "@/lib/prisma";

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
    const formData = await req.body;

    return new Response(JSON.stringify({ data: formData, message: "ok" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(JSON.stringify({ data: null, message: error }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
