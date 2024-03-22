"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ExamResults from "@/src/components/examResults";
import { getQuestionsOfModule } from "@/src/app/api/mongodbActions";
import Question from "@/src/components/question";
import AnswerContext from "@/src/components/answerContext";
import type { QuestionType } from "@/types/database";
import styles from "@/styles/globals.module.css";

type Props = {
  moduleId: string;
};

export default function QuestionModule({ moduleId }: Props) {
  const { userAnswers } = useContext(AnswerContext);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [rightAnswers, setRightAnswers] = useState<number>(0);
  const [examFinished, setExamFinished] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const questionsData = await getQuestionsOfModule(moduleId);
        setQuestions(questionsData);
      } catch (error) {
        console.log("error reading data from database:", error);
      }
    }
    fetchQuestions().then();
  }, [moduleId]);

  const checkUserAnswers = () => {
    let rightAnswersOfUser = 0;
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer == questions[index].answer) {
        rightAnswersOfUser += 1;
      }
    });
    setRightAnswers(rightAnswersOfUser);
    setExamFinished(true);
    window.scroll(0, 0);
  };

  return (
    <div>
      {questions.length > 0 ? (
        <>
          {examFinished ? (
            <ExamResults
              rightAnswers={rightAnswers}
              length={questions.length}
            />
          ) : (
            <></>
          )}
          {questions
            .sort(() => 0.5 - Math.random())
            .map((question, index) => (
              <Question
                key={index}
                number={index + 1}
                question={question}
                examFinished={examFinished}
              />
            ))}
          <Button
            variant="primary"
            size="sm"
            className={styles.button}
            onClick={() => checkUserAnswers()}
          >
            Check Answers
          </Button>
        </>
      ) : (
        <div className="fw-bold mt-4">Loading...</div>
      )}
    </div>
  );
}
