"use client";

import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { AnswerContextType, UserAnswersType } from "@/types/answerContextType";

const AnswerContext = createContext<AnswerContextType>({
  userAnswers: [],
  setUserAnswers: () => null,
  numberOfQuestions: 0,
  setNumberOfQuestions: () => null,
});

export function AnswerContextProvider(props: PropsWithChildren) {
  const [userAnswers, setUserAnswers] = useState<UserAnswersType[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);

  const answerContext: AnswerContextType = {
    userAnswers,
    setUserAnswers,
    numberOfQuestions,
    setNumberOfQuestions,
  };

  return (
    <AnswerContext.Provider value={answerContext}>
      {props.children}
    </AnswerContext.Provider>
  );
}

export default AnswerContext;
