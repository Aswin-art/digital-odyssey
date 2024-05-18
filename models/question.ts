import prisma from "@/lib/prisma";

export async function createNewQuestion() {
  try {
    return await prisma.question.create({
      data: {
        questionText: "What is 2 + 2?",
        answers: {
          create: [
            { text: "3", isCorrect: false },
            { text: "4", isCorrect: true },
            { text: "5", isCorrect: false },
            { text: "6", isCorrect: false },
          ],
        },
      },
    });
  } catch (error) {
    console.error("Error while getting user by ID:", error);
    throw new Error("Failed to get user by ID");
  }
}
