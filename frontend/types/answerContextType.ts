import type { Dispatch, SetStateAction } from "react";

export type AnswerContextType = {
  examIsFinished: boolean;
  setExamIsFinished: Dispatch<SetStateAction<boolean>>;
};
