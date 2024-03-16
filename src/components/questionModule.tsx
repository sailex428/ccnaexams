"use client";

import { useEffect, useState } from "react";
import { getQuestion } from "@/src/app/api/mongodbActions";
import type { QuestionType } from "@/types/database";
import Question from "@/src/components/question";

type Props = {
  moduleId: string;
  questionId: number;
};
export default function QuestionModule({ questionId, moduleId }: Props) {
  const [question, setQuestion] = useState<QuestionType[]>([]);
  const currentQuestion = question[0];

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const questionData = await getQuestion(questionId, moduleId);
        setQuestion(questionData);
      } catch (error) {
        console.log("error reading data from database:", error);
      }
    }
    fetchQuestion().then();
  }, [questionId, moduleId]);

  return (
    <>
      {currentQuestion ? (
        <Question
          question={currentQuestion.question}
          number={currentQuestion.number}
          answer={currentQuestion.answer}
          explanation={currentQuestion.explanation}
          options={currentQuestion.options}
          examIsFinished={false}
        />
      ) : (
        <div className="fw-bold mt-4">Loading...</div>
      )}
    </>
  );
}
