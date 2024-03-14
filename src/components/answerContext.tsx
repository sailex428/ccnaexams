"use client";

import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { AnswerContextType } from "@/types/answerContextType";

const AnswerContext = createContext<AnswerContextType>({
  userAnswers: [],
  setUserAnswers: () => null,
});

export function AnswerContextProvider(props: PropsWithChildren) {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const answerContext: AnswerContextType = {
    userAnswers,
    setUserAnswers,
  };

  return (
    <AnswerContext.Provider value={answerContext}>
      {props.children}
    </AnswerContext.Provider>
  );
}

export default AnswerContext;
