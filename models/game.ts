import prisma from "@/lib/prisma";

export async function setNewGameState(userId: string) {
  try {
    return await prisma.game.create({
      data: {
        userId: userId,
        currentScore: 100,
        currentHealth: 100,
      },
    });
  } catch (error) {
    console.error("Error while getting user by ID:", error);
    throw new Error("Failed to get user by ID");
  }
}
