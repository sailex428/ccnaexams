import type { Dispatch, SetStateAction } from "react";

export type AnswerContextType = {
  setUserAnswers: Dispatch<SetStateAction<UserAnswersType[]>>;
  userAnswers: UserAnswersType[];
  setNumberOfQuestions: Dispatch<SetStateAction<number>>;
  numberOfQuestions: number;
  examIsFinished: boolean;
  setExamIsFinished: Dispatch<SetStateAction<boolean>>;
};

export type UserAnswersType = {
  answers: string[];
  number: string;
};
