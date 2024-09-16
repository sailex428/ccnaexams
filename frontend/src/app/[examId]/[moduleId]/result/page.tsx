"use client";

import { useContext, useEffect } from "react";
import { useResult } from "@/src/app/api/actions";
import ExamPieChart from "@/src/components/examPieChart";
import styles from "@/styles/components/results.module.scss";
import { QuestionType } from "@/types/database";
import { CONSTANTS } from "@/src/components/lib/constants";
import AnswerContext from "@/src/components/context/answerContext";
import LanguageContext from "@/src/components/context/languageContext";

export default function ResultPage({
  params,
}: {
  params: {
    examId: string;
    moduleId: string;
    questionId: number;
    question: QuestionType[];
  };
}) {
  const { numberOfQuestions, userAnswers, setExamIsFinished } =
    useContext(AnswerContext);
  const { lang } = useContext(LanguageContext);
  const { result, isError, isMutating, postAnswers } = useResult(
    params.examId,
    params.moduleId,
  );

  useEffect(() => {
    setExamIsFinished(true);
    postAnswers([...userAnswers]);
  }, [userAnswers]);

  if (isMutating) {
    return (
      <div className={styles.container}>
        <div className="fw-bold mt-4">Module is loading...</div>
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

  const percentageOfRightAnswers =
    result.rightAnswersCount != 0
      ? ((result.rightAnswersCount / numberOfQuestions) * 100).toFixed(2)
      : 0;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.result}>
          <h5 className="fw-bold">{CONSTANTS.resultPageHeading[lang]}</h5>
          <div className={styles.pieChart}>
            <ExamPieChart
              label={percentageOfRightAnswers + "%"}
              firstPartOfChart={result.rightAnswersCount}
              secondPartOfChart={numberOfQuestions - result.rightAnswersCount}
            />
          </div>
          <p className="fw-bold mt-3">{CONSTANTS.resultPageText[lang]}</p>
        </div>
      </div>
    </>
  );
}
