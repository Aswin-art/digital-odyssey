const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: "clxkon9at0000wne7q2hrl70n",
    },
  });

  if (!existingUser) {
    throw new Error("User dengan ID yang diberikan tidak ditemukan.");
  }

  // Seed Game
  const game = await prisma.game.create({
    data: {
      userId: existingUser.id,
      title: "Chronicles of Canonics",
      gameCode: "KjTbgf", // Contoh kode unik game
      description:
        "Perdalam pemahamanmu mengenai sistem kanonik pada sistem digital dengan cara menyelesaikan msi yang ada di game ini!",
      introVideo: "https://example.com/intro.mp4", // URL video intro game
    },
  });

  // Seed Question
  const question1 = await prisma.question.create({
    data: {
      content:
        "Fungsi logika F(A, B, C) = A'B + BC dalam bentuk kanonik SOP adalah: ?",
      gameId: game.id,
    },
  });

  // Seed Option
  await prisma.option.create({
    data: {
      content: "A'B'C + A'BC' + A'BC + AB'C",
      isCorrect: true,
      questionId: question1.id,
    },
  });

  await prisma.option.create({
    data: {
      content: "AB'C + ABC' + ABC + A'BC",
      isCorrect: false,
      questionId: question1.id,
    },
  });

  await prisma.option.create({
    data: {
      content: "A'B'C + A'BC' + ABC + A'BC",
      isCorrect: false,
      questionId: question1.id,
    },
  });

  // Seed Question
  const question2 = await prisma.question.create({
    data: {
      content: "Fungsi logika F(A, B) = A + B dalam bentuk kanonik POS adalah:",
      gameId: game.id,
    },
  });

  // Seed Option
  await prisma.option.create({
    data: {
      content: "(A + B)(A' + B)",
      isCorrect: false,
      questionId: question2.id,
    },
  });

  await prisma.option.create({
    data: {
      content: "(A + B)(A + B')",
      isCorrect: true,
      questionId: question2.id,
    },
  });

  await prisma.option.create({
    data: {
      content: "A' + B)(A + B')",
      isCorrect: false,
      questionId: question2.id,
    },
  });

  // Seed Question
  const question3 = await prisma.question.create({
    data: {
      content: "Fungsi logika F(A, B) = A'B' dalam bentuk kanonik SOP adalah:",
      gameId: game.id,
    },
  });

  // Seed Option
  await prisma.option.create({
    data: {
      content: "A'B'",
      isCorrect: true,
      questionId: question3.id,
    },
  });

  await prisma.option.create({
    data: {
      content: "A'B + AB'",
      isCorrect: false,
      questionId: question3.id,
    },
  });

  await prisma.option.create({
    data: {
      content: "A'B' + AB",
      isCorrect: false,
      questionId: question3.id,
    },
  });

  // Seed Question
  const question4 = await prisma.question.create({
    data: {
      content:
        "Fungsi logika F(A, B, C) = A + B' dalam bentuk kanonik POS adalah:",
      gameId: game.id,
    },
  });

  // Seed Option
  await prisma.option.create({
    data: {
      content: "(A + B')(A' + B)(A + B)(A' + B')",
      isCorrect: true,
      questionId: question4.id,
    },
  });

  await prisma.option.create({
    data: {
      content: "(A + B)(A' + B)",
      isCorrect: false,
      questionId: question4.id,
    },
  });

  await prisma.option.create({
    data: {
      content: "(A + B')(A' + B)(A + B)",
      isCorrect: false,
      questionId: question4.id,
    },
  });

  // Seed Question
  const question5 = await prisma.question.create({
    data: {
      content:
        " Fungsi logika F(A, B, C) = A'B'C' dalam bentuk kanonik POS adalah:",
      gameId: game.id,
    },
  });

  // Seed Option
  await prisma.option.create({
    data: {
      content: "(A + B + C)",
      isCorrect: true,
      questionId: question5.id,
    },
  });

  await prisma.option.create({
    data: {
      content: "(A + B + C')",
      isCorrect: false,
      questionId: question5.id,
    },
  });

  await prisma.option.create({
    data: {
      content: "(A' + B' + C')",
      isCorrect: false,
      questionId: question5.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
