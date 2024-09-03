"use client";

import { useContext, useEffect } from "react";
import { useResult } from "@/src/app/api/actions";
import PieChart from "@/src/components/pieChart";
import AnswerContext from "@/src/components/answerContext";
import styles from "@/styles/components/results.module.css";
import { QuestionType } from "@/types/database";
import ResultFooter from "@/src/components/resultFooter";
import { properties } from "@/src/components/lib/static";
import LanguageContext from "@/src/components/languageContext";

export default function ResultPage({
  params,
}: {
  params: { moduleId: string; questionId: number; question: QuestionType[] };
}) {
  const { numberOfQuestions, userAnswers, setExamIsFinished } =
    useContext(AnswerContext);
  const { lang } = useContext(LanguageContext);
  const { result, isError, isMutating, postAnswers } = useResult(
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

  console.log(numberOfQuestions);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.result}>
          <h5 className="fw-bold">{properties.resultPageHeading[lang]}</h5>
          <div className={styles.pieChart}>
            <PieChart
              label={percentageOfRightAnswers + "%"}
              firstPartOfChart={result.rightAnswersCount}
              secondPartOfChart={numberOfQuestions - result.rightAnswersCount}
            />
          </div>
          <p className="fw-bold mt-3">{properties.resultPageText[lang]}</p>
        </div>
      </div>
      <ResultFooter moduleId={params.moduleId} />
    </>
  );
}
