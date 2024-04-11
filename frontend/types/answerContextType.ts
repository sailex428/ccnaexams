import type { Dispatch, SetStateAction } from "react";
import { LanguageArrayType } from "@/types/database";

export type AnswerContextType = {
  setUserAnswers: Dispatch<SetStateAction<UserAnswersType[]>>;
  userAnswers: UserAnswersType[];
  setNumberOfQuestions: Dispatch<SetStateAction<number>>;
  numberOfQuestions: number;
  examIsFinished: boolean;
  setExamIsFinished: Dispatch<SetStateAction<boolean>>;
};

export type UserAnswersType = {
  answer: LanguageArrayType;
  number: string;
};
