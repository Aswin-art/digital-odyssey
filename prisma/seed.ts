const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      games: {
        create: [
          {
            title: "Game 1",
            gameCode: "game_1_code",
            description: "Description for Game 1",
            introVideo: "http://example.com/intro1.mp4",
            gamePlayers: {
              create: [
                {
                  playerName: "Player 1",
                  playerNpm: "npm_1",
                },
                {
                  playerName: "Player 2",
                  playerNpm: "npm_2",
                },
              ],
            },
            questions: {
              create: [
                {
                  content: "Question 1 for Game 1",
                  options: {
                    create: [
                      { content: "Option 1", isCorrect: true },
                      { content: "Option 2", isCorrect: false },
                      { content: "Option 3", isCorrect: false },
                    ],
                  },
                },
                {
                  content: "Question 2 for Game 1",
                  options: {
                    create: [
                      { content: "Option 1", isCorrect: false },
                      { content: "Option 2", isCorrect: true },
                      { content: "Option 3", isCorrect: false },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Game 2",
            gameCode: "game_2_code",
            description: "Description for Game 2",
            introVideo: "http://example.com/intro2.mp4",
            gamePlayers: {
              create: [
                {
                  playerName: "Player 3",
                  playerNpm: "npm_3",
                },
                {
                  playerName: "Player 4",
                  playerNpm: "npm_4",
                },
              ],
            },
            questions: {
              create: [
                {
                  content: "Question 1 for Game 2",
                  options: {
                    create: [
                      { content: "Option 1", isCorrect: false },
                      { content: "Option 2", isCorrect: false },
                      { content: "Option 3", isCorrect: true },
                    ],
                  },
                },
                {
                  content: "Question 2 for Game 2",
                  options: {
                    create: [
                      { content: "Option 1", isCorrect: true },
                      { content: "Option 2", isCorrect: false },
                      { content: "Option 3", isCorrect: false },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@prisma.io",
      games: {
        create: [
          {
            title: "Game 3",
            gameCode: "game_3_code",
            description: "Description for Game 3",
            introVideo: "http://example.com/intro3.mp4",
            gamePlayers: {
              create: [
                {
                  playerName: "Player 5",
                  playerNpm: "npm_5",
                },
                {
                  playerName: "Player 6",
                  playerNpm: "npm_6",
                },
              ],
            },
            questions: {
              create: [
                {
                  content: "Question 1 for Game 3",
                  options: {
                    create: [
                      { content: "Option 1", isCorrect: true },
                      { content: "Option 2", isCorrect: false },
                      { content: "Option 3", isCorrect: false },
                    ],
                  },
                },
                {
                  content: "Question 2 for Game 3",
                  options: {
                    create: [
                      { content: "Option 1", isCorrect: false },
                      { content: "Option 2", isCorrect: true },
                      { content: "Option 3", isCorrect: false },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Game 4",
            gameCode: "game_4_code",
            description: "Description for Game 4",
            introVideo: "http://example.com/intro4.mp4",
            gamePlayers: {
              create: [
                {
                  playerName: "Player 7",
                  playerNpm: "npm_7",
                },
                {
                  playerName: "Player 8",
                  playerNpm: "npm_8",
                },
              ],
            },
            questions: {
              create: [
                {
                  content: "Question 1 for Game 4",
                  options: {
                    create: [
                      { content: "Option 1", isCorrect: false },
                      { content: "Option 2", isCorrect: true },
                      { content: "Option 3", isCorrect: false },
                    ],
                  },
                },
                {
                  content: "Question 2 for Game 4",
                  options: {
                    create: [
                      { content: "Option 1", isCorrect: false },
                      { content: "Option 2", isCorrect: false },
                      { content: "Option 3", isCorrect: true },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log({ alice, bob });
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
