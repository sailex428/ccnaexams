"use client";

import React, { useContext, useEffect, useState } from "react";
import Footer from "@/src/components/footer";
import { getDetail, getQuestion } from "@/src/app/api/actions";
import { QuestionType } from "@/types/database";
import styles from "@/styles/pages/questionpage.module.css";
import Question from "@/src/components/question";
import AnswerContext from "@/src/components/answerContext";

export default function QuestionPage({
  params,
}: {
  params: { questionId: number; moduleId: string; question: QuestionType[] };
}) {
  const { numberOfQuestions, setNumberOfQuestions, examIsFinished } =
    useContext(AnswerContext);
  const [question, setQuestion] = useState<QuestionType>({} as QuestionType);

  useEffect(() => {
    const fetchQuestions = async () => {
      await getQuestion(params.moduleId, params.questionId).then((data) => {
        setQuestion(data);
      });
      if (numberOfQuestions == 0) {
        await getDetail(params.moduleId).then((data) => {
          setNumberOfQuestions(data.numberOfQuestions);
        });
      }
    };
    fetchQuestions();
  }, [params.moduleId]);

  if (question == null) {
    return (
      <div className={styles.container}>
        <div className="fw-bold mt-4">An Error occurred</div>
      </div>
    );
  } else if (question.question != null) {
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
  } else {
    return (
      <div className={styles.container}>
        <div className="fw-bold mt-5">Question is loading...</div>
        <Footer moduleId={params.moduleId} questionId={params.questionId} />
      </div>
    );
  }
}
