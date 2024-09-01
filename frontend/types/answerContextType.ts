import type { Dispatch, SetStateAction } from "react";
import { AnswersType, LanguageArrayType } from "@/types/database";

export type AnswerContextType = {
  setUserAnswers: Dispatch<SetStateAction<AnswersType[]>>;
  userAnswers: AnswersType[];
  setNumberOfQuestions: Dispatch<SetStateAction<number>>;
  numberOfQuestions: number;
  examIsFinished: boolean;
  setExamIsFinished: Dispatch<SetStateAction<boolean>>;
};
