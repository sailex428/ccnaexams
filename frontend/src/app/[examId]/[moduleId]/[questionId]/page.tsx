"use client";

import Footer from "@/src/components/footer";
import { useQuestion } from "@/src/app/api/actions";
import { QuestionType } from "@/types/database";
import styles from "@/styles/pages/questionpage.module.scss";
import Question from "@/src/components/question";
import { useContext } from "react";
import AnswerContext from "@/src/components/answerContext";

export default function QuestionPage({
  params,
}: {
  params: {
    examId: string;
    questionId: number;
    moduleId: string;
    question: QuestionType[];
  };
}) {
  const { examIsFinished } = useContext(AnswerContext);
  const { question, isLoading, isError } = useQuestion(
    params.examId,
    params.moduleId,
    params.questionId,
  );

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className="fw-bold mt-5">Question is loading...</div>
        <Footer moduleId={params.moduleId} questionId={params.questionId} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <div className="fw-bold mt-4">An Error occurred</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.question}>
          <Question question={question} examIsFinished={examIsFinished} />
        </div>
      </div>
      <Footer moduleId={params.moduleId} questionId={params.questionId} />
    </>
  );
}
