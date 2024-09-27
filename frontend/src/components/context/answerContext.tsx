"use client";

import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { AnswerContextType } from "@/types/answerContextType";

const AnswerContext = createContext<AnswerContextType>({
  examIsFinished: false,
  setExamIsFinished: () => null,
});

export function AnswerContextProvider(props: PropsWithChildren) {
  const [examIsFinished, setExamIsFinished] = useState<boolean>(false);

  const answerContext: AnswerContextType = {
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
