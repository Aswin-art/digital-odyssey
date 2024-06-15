import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await auth();
    return Response.json({ message: "success", data: user });
  } catch (err) {
    console.log(err);
    return Response.json({ message: err, data: null });
  }
}
