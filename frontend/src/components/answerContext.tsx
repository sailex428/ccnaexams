"use client";

import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { AnswerContextType } from "@/types/answerContextType";
import { AnswersType, ResultType } from "@/types/database";

const AnswerContext = createContext<AnswerContextType>({
  userAnswers: [],
  setUserAnswers: () => null,
  result: {} as ResultType,
  setResult: () => null,
  numberOfQuestions: 0,
  setNumberOfQuestions: () => null,
  examIsFinished: false,
  setExamIsFinished: () => null,
});

export function AnswerContextProvider(props: PropsWithChildren) {
  const [userAnswers, setUserAnswers] = useState<AnswersType[]>([]);
  const [result, setResult] = useState<ResultType>({} as ResultType);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [examIsFinished, setExamIsFinished] = useState<boolean>(false);

  const answerContext: AnswerContextType = {
    userAnswers,
    setUserAnswers,
    result,
    setResult,
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
