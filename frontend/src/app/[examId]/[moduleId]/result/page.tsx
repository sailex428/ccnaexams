"use client";

import { useContext, useEffect, useState } from "react";
import ExamPieChart from "@/src/components/examPieChart";
import styles from "@/styles/components/results.module.scss";
import AnswerContext from "@/src/components/context/answerContext";
import clsx from "clsx";
import { useResult } from "@/src/components/hook/useResult";
import { useDetail } from "@/src/components/hook/useDetails";
import { getCookieUserAnswers } from "@/utils/cookies";
import { AnswersType } from "@/types/database";

export default function ResultPage({
  params,
}: {
  params: {
    examId: string;
    moduleId: string;
  };
}) {
  const [userAnswers, setUserAnswers] = useState<AnswersType[]>([]);
  const { result, isError, isMutating, postAnswers } = useResult(
    params.examId,
    params.moduleId,
  );
  const {
    details,
    isLoading,
    isError: isDetailError,
  } = useDetail(params.examId, params.moduleId);

  useEffect(() => {
    if (!isLoading || result) {
      const savedUserAnswers = getCookieUserAnswers();
      if (savedUserAnswers) {
        setUserAnswers(JSON.parse(savedUserAnswers));
      }
    }
    postAnswers(userAnswers);
  }, []);

  const percentageOfRightAnswers =
    result.rightAnswersCount != 0
      ? (
          (result.rightAnswersCount / details[0]?.numberOfQuestions) *
          100
        ).toFixed(2)
      : 0;

  if (isMutating || isLoading) {
    return (
      <div className={"defaultBackground align-items-center"}>
        <div className={clsx(styles.result, "defaultText")}>
          <h5 className={styles.text}>Result is loading...</h5>
        </div>
      </div>
    );
  }

  if (isError || isDetailError) {
    return (
      <div className={"defaultBackground align-items-center"}>
        <div className={clsx(styles.result, "defaultText")}>
          <h5 className={styles.text}>An Error occurred</h5>
        </div>
      </div>
    );
  }

  return (
    <div className={"defaultBackground align-items-center"}>
      <div className={clsx(styles.result, "defaultText")}>
        <h5 className={styles.text}>Exam Result</h5>
        <div className={styles.pieChart}>
          <ExamPieChart
            label={percentageOfRightAnswers + "%"}
            firstPartOfChart={result.rightAnswersCount}
            secondPartOfChart={
              details[0]?.numberOfQuestions - result.rightAnswersCount
            }
          />
        </div>
      </div>
    </div>
  );
}
