"use client";

import { useDetail, useQuestions } from "@/src/app/api/actions";
import { QuestionType } from "@/types/database";
import styles from "@/styles/pages/questionpage.module.scss";
import Question from "@/src/components/question";
import React, { useContext, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { isDesktop, isMobile } from "react-device-detect";
import ExamNavigationButtons from "@/src/components/examNavigationButtons";
import AnswerContext from "@/src/components/context/answerContext";

export default function QuestionPage({
  params,
}: {
  params: {
    examId: string;
    moduleId: string;
    question: QuestionType[];
  };
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const { examIsFinished } = useContext(AnswerContext);
  const {
    details,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useDetail(params.examId, params.moduleId);

  const { questions, isLoading, isError } = useQuestions(
    params.examId,
    params.moduleId,
  );

  const randomizeQuestions = (questions: QuestionType[], length: number) => {
    return Array.from({ length }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .map(
        (n) =>
          questions.find((q) => parseInt(q.number) === n) ??
          ({} as QuestionType),
      );
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const swipeHandler = useSwipeable({
    onSwipedLeft: handleNextQuestion,
    onSwipedRight: handlePreviousQuestion,
    trackMouse: true,
  });

  const randomizedQuestions = randomizeQuestions(
    questions ?? [],
    details[0]?.numberOfQuestions,
  );

  if (isLoading || isDetailLoading) {
    return <></>;
  }

  if (isError || isDetailError || questions.length === 0) {
    return (
      <div className={styles.questionBackground}>
        <div className={styles.questionContainer}>
          <div className="fw-bold mt-4">An Error occurred</div>
        </div>
      </div>
    );
  }

  return (
    <div
      {...(isMobile ? swipeHandler : {})}
      className={styles.questionBackground}
    >
      <div className={styles.questionContainer}>
        <Question
          question={randomizedQuestions[currentQuestionIndex]}
          examIsFinished={examIsFinished}
        />
      </div>
      {isDesktop && (
        <ExamNavigationButtons
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={details[0]?.numberOfQuestions}
          onPreviousQuestion={handlePreviousQuestion}
          onNextQuestion={handleNextQuestion}
        />
      )}
    </div>
  );
}
