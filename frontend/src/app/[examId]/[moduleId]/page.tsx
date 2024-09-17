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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import {
  getQuestionOrderCookie,
  setQuestionOrderCookie,
} from "@/utils/cookies";
import { getOrderedQuestions, randomizeOrder } from "@/utils/questionOrder";

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
      const savedOrder = getQuestionOrderCookie();
      if (savedOrder) {
        setRandomizedQuestions(
          getOrderedQuestions(questions, JSON.parse(savedOrder)),
        );
      } else {
        const order = randomizeOrder(questions.length);
        setRandomizedQuestions(getOrderedQuestions(questions, order));
        setQuestionOrderCookie(order);
      }
    }
  }, [isLoading, isDetailLoading, questions, details]);

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
      {isMobile && (
        <div className={styles.examResultButtonWrapper}>
          <button
            className={styles.examResultButton}
            onClick={() => {
              //TODO: call result
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
