"use client";

import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { AnswerContextType } from "@/types/answerContextType";
import { AnswersType } from "@/types/database";

const AnswerContext = createContext<AnswerContextType>({
  userAnswers: [],
  setUserAnswers: () => null,
  examIsFinished: false,
  setExamIsFinished: () => null,
});

export function AnswerContextProvider(props: PropsWithChildren) {
  const [userAnswers, setUserAnswers] = useState<AnswersType[]>([]);
  const [examIsFinished, setExamIsFinished] = useState<boolean>(false);

  const answerContext: AnswerContextType = {
    userAnswers,
    setUserAnswers,
    examIsFinished,
    setExamIsFinished,
  };

  return (
    <AnswerContext.Provider value={answerContext}>
      {props.children}
    </AnswerContext.Provider>
  );
}

export default AnswerContext;
