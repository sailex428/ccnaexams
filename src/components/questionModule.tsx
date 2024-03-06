"use client";

import { getModuleQuestions } from "@/src/actions/mongodbActions";
import { useEffect, useState } from "react";
import { QuestionModule } from "@/types/database";
import Question from "@/src/components/question";

type Props = {
  moduleId: string;
};

export default function QuestionModule({ moduleId }: Props) {
  const [questions, setQuestions] = useState<QuestionModule[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const questionsData = await getModuleQuestions(moduleId);
        console.log(questionsData.length);
        setQuestions(questionsData);
      } catch (error) {
        console.log("error reading data from database:", error);
      }
    }
    fetchQuestions();
  }, [moduleId]);

  return (
    <div>
      {questions.map((question) => (
        <Question
          question={question.question}
          number={question.number}
          answer={question.answer}
          explanation={question.explanation}
          options={question.options}
        />
      ))}
    </div>
  );
}
