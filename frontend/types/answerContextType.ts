import type { Dispatch, SetStateAction } from "react";
import { AnswersType, ResultType } from "@/types/database";

export type AnswerContextType = {
  setUserAnswers: Dispatch<SetStateAction<AnswersType[]>>;
  userAnswers: AnswersType[];
  result: ResultType;
  setResult: Dispatch<SetStateAction<ResultType>>;
  setNumberOfQuestions: Dispatch<SetStateAction<number>>;
  numberOfQuestions: number;
  examIsFinished: boolean;
  setExamIsFinished: Dispatch<SetStateAction<boolean>>;
};
