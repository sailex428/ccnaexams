import type { Dispatch, SetStateAction } from "react";

export type AnswerContextType = {
  setUserAnswers: Dispatch<SetStateAction<Array<string[]>>>;
  userAnswers: Array<string[]>;
};
