import prisma from "@/lib/prisma";

export async function getAllItems(userId: string) {
  try {
    return await prisma.result.create({
      data: {
        userId: userId,
        score: 100,
        correct: 10,
        incorrect: 2,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error while getting user by ID:", error);
    throw new Error("Failed to get user by ID");
  }
}
