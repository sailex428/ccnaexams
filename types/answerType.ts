import type { Dispatch, SetStateAction } from "react";

export type AnswerContextType = {
  setUserAnswers: Dispatch<SetStateAction<string[]>>;
  userAnswers: Array<string>;
};
