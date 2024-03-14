"use client";

import { useEffect, useState } from "react";
import { getQuestion } from "@/src/actions/mongodbActions";
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
    fetchQuestion();
  }, [questionId, moduleId]);

  return (
    <>
      {currentQuestion != undefined ? (
        <Question
          question={currentQuestion.question}
          number={currentQuestion.number}
          answer={currentQuestion.answer}
          explanation={currentQuestion.explanation}
          options={currentQuestion.options}
          rightAnswers={-1}
        />
      ) : (
        <div className="fw-bold">Loading...</div>
      )}
    </>
  );
}
