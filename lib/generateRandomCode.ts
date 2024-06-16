import prisma from "./prisma";

const getGameCode = async (gameCode: string) => {
  const result = await prisma.game.findUnique({
    where: { gameCode },
  });
  return result;
};

export async function generateRandomCode(length = 6) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  let isUnique = false;

  while (!isUnique) {
    result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const checkGameCode = await getGameCode(result);
    isUnique = !checkGameCode;
  }

  return result;
}
