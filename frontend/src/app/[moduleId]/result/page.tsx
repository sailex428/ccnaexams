"use client";

import { useContext, useEffect, useState } from "react";
import { postAnswers } from "@/src/app/api/actions";
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
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      await postAnswers(params.moduleId, userAnswers).then((data) => {
        setResult(data);
      });
    };
    setExamIsFinished(true);
    fetchQuestions();
  }, [params.moduleId]);

  let percentageOfRightAnswers = result;
  if (result != 0) {
    percentageOfRightAnswers = (result / numberOfQuestions) * 100;
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.result}>
          <h5 className="fw-bold">{properties.resultPageHeading[lang]}</h5>
          <div className={styles.pieChart}>
            <PieChart
              label={percentageOfRightAnswers.toFixed(2) + "%"}
              firstPartOfChart={result}
              secondPartOfChart={numberOfQuestions - result}
            />
          </div>
          <p className="fw-bold mt-3">{properties.resultPageText[lang]}</p>
        </div>
      </div>
      <ResultFooter moduleId={params.moduleId} />
    </>
  );
}
