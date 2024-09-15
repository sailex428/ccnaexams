"use client";

import { useDetail, useQuestions } from "@/src/app/api/actions";
import { QuestionType } from "@/types/database";
import styles from "@/styles/pages/questionpage.module.scss";
import ExamQuestion from "@/src/components/examQuestion";
import React, { useContext, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { isDesktop, isMobile } from "react-device-detect";
import ExamNavigationButtons from "@/src/components/examNavigationButtons";
import AnswerContext from "@/src/components/context/answerContext";
import { getCookie, setCookie } from "cookies-next";

export default function QuestionPage({
  params,
}: {
  params: {
    examId: string;
    moduleId: string;
    question: QuestionType[];
  };
}) {
  const [randomizedQuestions, setRandomizedQuestions] = useState<
    QuestionType[]
  >([] as QuestionType[]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionAnimation, setQuestionAnimation] = useState<number>(0);
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

  useEffect(() => {
    if (!isLoading && !isDetailLoading && questions.length > 0) {
      const savedOrder = getCookie("questionOrder");
      if (savedOrder) {
        const order = JSON.parse(savedOrder);
        const orderedQuestions = order.map((index: number) => questions[index]);
        setRandomizedQuestions(orderedQuestions);
      } else {
        const order = randomizeOrder(questions.length);
        const orderedQuestions = order.map((index: number) => questions[index]);
        setRandomizedQuestions(orderedQuestions);
        setCookie("questionOrder", JSON.stringify(order), {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
          sameSite: "strict",
        });
      }
    }
  }, [isLoading, isDetailLoading, questions, details]);

  const randomizeOrder = (length: number) => {
    return Array.from({ length }, (_, i) => i).sort(() => Math.random() - 0.5);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setQuestionAnimation(1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setQuestionAnimation(-1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const swipeHandler = useSwipeable({
    onSwipedLeft: handleNextQuestion,
    onSwipedRight: handlePreviousQuestion,
  });

  if (isLoading || isDetailLoading || randomizedQuestions.length === 0) {
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
      <div
        className={styles.questionContainer}
        data-question={questionAnimation}
        onAnimationEnd={() => {
          setQuestionAnimation(0);
        }}
      >
        <ExamQuestion
          question={randomizedQuestions[currentQuestionIndex]}
          examIsFinished={examIsFinished}
          currentQuestion={currentQuestionIndex}
        />
        {isDesktop && (
          <ExamNavigationButtons
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={details[0]?.numberOfQuestions}
            onPreviousQuestion={handlePreviousQuestion}
            onNextQuestion={handleNextQuestion}
          />
        )}
      </div>
    </div>
  );
}
