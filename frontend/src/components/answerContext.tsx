"use client";

import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { AnswerContextType, UserAnswersType } from "@/types/answerContextType";

const AnswerContext = createContext<AnswerContextType>({
  userAnswers: [],
  setUserAnswers: () => null,
  numberOfQuestions: 0,
  setNumberOfQuestions: () => null,
  examIsFinished: false,
  setExamIsFinished: () => null,
});

export function AnswerContextProvider(props: PropsWithChildren) {
  const [userAnswers, setUserAnswers] = useState<UserAnswersType[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [examIsFinished, setExamIsFinished] = useState<boolean>(false);

  const answerContext: AnswerContextType = {
    userAnswers,
    setUserAnswers,
    numberOfQuestions,
    setNumberOfQuestions,
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
