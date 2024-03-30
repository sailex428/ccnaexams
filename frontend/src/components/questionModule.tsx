"use client";

import { useEffect, useState } from "react";
import type { QuestionType } from "@/types/database";
import Question from "@/src/components/question";
import { getQuestion } from "@/src/app/api/actions";

type Props = {
  moduleId: string;
  questionId: number;
};
export default function QuestionModule({ questionId, moduleId }: Props) {
  const [question, setQuestion] = useState<QuestionType[]>([]);
  console.log(moduleId);
  useEffect(() => {
    const fetchQuestions = async () => {
      await getQuestion(moduleId, questionId).then((data) => {
        setQuestion(data);
      });
    };
    fetchQuestions();
  }, [moduleId, questionId]);

  if (question == null) {
    return <div className="fw-bold mt-4">An Error occurred</div>;
  } else if (question.length > 0) {
    return <Question question={question[0]} examIsFinished={false} />;
  } else {
    return <div className="fw-bold mt-4">Question is loading...</div>;
  }
}
