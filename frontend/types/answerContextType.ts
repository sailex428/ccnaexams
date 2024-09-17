import type { Dispatch, SetStateAction } from "react";
import { AnswersType } from "@/types/database";

export type AnswerContextType = {
  setUserAnswers: Dispatch<SetStateAction<AnswersType[]>>;
  userAnswers: AnswersType[];
  examIsFinished: boolean;
  setExamIsFinished: Dispatch<SetStateAction<boolean>>;
};
