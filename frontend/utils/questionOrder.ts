import { QuestionType } from "@/types/database";

export const randomizeOrder = (length: number) => {
  return Array.from({ length }, (_, i) => i).sort(() => Math.random() - 0.5);
};

export const getOrderedQuestions = (
  questions: QuestionType[],
  order: number[],
) => {
  return order.map((index: number) => questions[index]);
};
