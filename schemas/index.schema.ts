import { z } from "zod";

export const gameSchema = z.object({
  userId: z.string({ message: "userId is required!" }),
  gameId: z.string({ message: "gameId is required" }),
  title: z.string({ required_error: "Title is required!" }),
  gameCode: z.string({ required_error: "Game Code is required!" }),
  description: z.string().nullable().optional(),
  introVideo: z.string().nullable().optional(),
});

export const gamePlayerSchema = z.object({
  gameCode: z.string({ required_error: "Game Code is required!" }),
  playerName: z.string({ required_error: "Player name is required!" }),
  playerNpm: z.string({ required_error: "Player npm is required!" }),
});

export const questionSchema = z.object({
  gameId: z.string({ message: "gameId is required!" }),
  content: z.string({ required_error: "Content is required!" }),
  options: z
    .string({ required_error: "Option is required!" })
    .array()
    .nonempty({ message: "Option can not be empty!" }),
});

export const optionSchema = z.object({
  questionId: z.string({ message: "questionId is required!" }),
  content: z.string({ required_error: "Content is required!" }),
  isCorrect: z.boolean({ required_error: "isCorrect is required!" }),
});

export const optionArraySchema = z
  .array(optionSchema)
  .nonempty({ message: "Option can not be empty!" });
