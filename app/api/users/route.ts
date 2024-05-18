import { GetCurrentUser } from "@/models/user";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = GetCurrentUser();
    return Response.json({ message: "success", data: user });
  } catch (err) {
    console.log(err);
    return Response.json({ message: err, data: null });
  }
}
