import { z } from "zod";

export const gameSchema = z.object({
  userId: z.number({
    invalid_type_error: "Must be a number!",
    required_error: "userId is required!",
  }),
  gameId: z.number({
    invalid_type_error: "Must be a number!",
    required_error: "gameId is required!",
  }),
  title: z.string({ required_error: "Title is required!" }),
  description: z.string().nullable(),
  introVideo: z.string().nullable(),
});

export const gamePlayerSchema = z.object({
  gameId: z.number({
    invalid_type_error: "Must be a number!",
    required_error: "gameId is required!",
  }),
  playerName: z.string({ required_error: "Player name is required!" }),
  playerNpm: z.string({ required_error: "Player npm is required!" }),
});

export const questionSchema = z.object({
  gameId: z.number({
    invalid_type_error: "Must be a number!",
    required_error: "gameId is required!",
  }),
  content: z.string({ required_error: "Content is required!" }),
  options: z
    .string({ required_error: "Option is required!" })
    .array()
    .nonempty({ message: "Option can not be empty!" }),
});

export const optionSchema = z.object({
  questionId: z.number({
    invalid_type_error: "Must be a number!",
    required_error: "questionId is required!",
  }),
  content: z.string({ required_error: "Content is required!" }),
  isCorrect: z.boolean({ required_error: "isCorrect is required!" }),
});
