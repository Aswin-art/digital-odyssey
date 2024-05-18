import { GetCurrentUser } from "@/models/user";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  try {
    const user = GetCurrentUser();
    return Response.json({ message: "success", data: user });
  } catch (err) {
    console.log(err);
    return Response.json({ message: err, data: null });
  }
}
