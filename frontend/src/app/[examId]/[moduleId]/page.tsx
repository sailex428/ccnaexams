"use client";

import { QuestionType } from "@/types/database";
import styles from "@/styles/pages/questionpage.module.scss";
import ExamQuestion from "@/src/components/examQuestion";
import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import ExamNavigationButtons from "@/src/components/examNavigationButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import {
  getCookieCurrentQuestion,
  getCookieQuestionOrder,
  setCookieCurrentQuestion,
  setCookieExamIsFinished,
  setCookieQuestionOrder,
} from "@/utils/cookies";
import { getOrderedQuestions, randomizeOrder } from "@/utils/questionOrder";
import { useRouter } from "next/navigation";
import { useDetail } from "@/src/components/hook/useDetails";
import { useQuestions } from "@/src/components/hook/useQuestions";
import { Spinner } from "react-bootstrap";

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
  const router = useRouter();
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
      const savedOrder = getCookieQuestionOrder();
      if (savedOrder && savedOrder.length > 2) {
        setRandomizedQuestions(
          getOrderedQuestions(questions, JSON.parse(savedOrder)),
        );
      } else {
        const order = randomizeOrder(questions.length);
        setRandomizedQuestions(getOrderedQuestions(questions, order));
        setCookieQuestionOrder(order);
      }
      const savedQuestionIndex = getCookieCurrentQuestion();
      if (savedQuestionIndex) {
        setCurrentQuestionIndex(JSON.parse(savedQuestionIndex));
      }
    }
  }, [isLoading, isDetailLoading, questions, details]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setQuestionAnimation(1);
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
      setCookieCurrentQuestion(nextQuestionIndex);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setQuestionAnimation(-1);
      const previousQuestionIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(previousQuestionIndex);
      setCookieCurrentQuestion(previousQuestionIndex);
    }
  };

  const swipeHandler = useSwipeable({
    onSwipedLeft: handleNextQuestion,
    onSwipedRight: handlePreviousQuestion,
  });

  if (isLoading || isDetailLoading || randomizedQuestions.length === 0) {
    return (
      <div className={styles.questionBackground}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
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
  //TODO: move ExamQuestion and ExamNavigationButtons to a separate component
  return (
    <div
      {...(isMobile || isTablet ? swipeHandler : {})}
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
          currentQuestion={currentQuestionIndex}
        />
        {isDesktop && (
          <ExamNavigationButtons
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={details[0]?.numberOfQuestions}
            onPreviousQuestion={handlePreviousQuestion}
            onNextQuestion={handleNextQuestion}
            params={params}
          />
        )}
      </div>
      {(isMobile || isTablet) && (
        <div className={styles.examResultButtonWrapper}>
          <button
            className={styles.examResultButton}
            onClick={() => {
              router.push(`/${params.examId}/${params.moduleId}/result`);
              setCookieExamIsFinished(true);
            }}
            title={"Finish"}
          >
            <FontAwesomeIcon className={"defaultIcon"} icon={faFlag} />
          </button>
        </div>
      )}
    </div>
  );
}
