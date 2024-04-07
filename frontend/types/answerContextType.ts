import type { Dispatch, SetStateAction } from "react";

export type AnswerContextType = {
  setUserAnswers: Dispatch<SetStateAction<UserAnswersType[]>>;
  userAnswers: UserAnswersType[];
  setNumberOfQuestions: Dispatch<SetStateAction<number>>;
  numberOfQuestions: number;
};

export type UserAnswersType = {
  answers: string[];
  number: string;
};
