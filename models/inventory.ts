import prisma from "@/lib/prisma";

export async function getItems(userId: string) {
  try {
    return await prisma.inventory.findUnique({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error("Error while getting user by ID:", error);
    throw new Error("Failed to get user by ID");
  }
}
