import { auth } from "@/auth";

export async function GetCurrentUser() {
  const user = await auth();

  return user;
}
