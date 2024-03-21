"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ExamResults from "@/src/components/examResults";
import { getQuestionsOfModule } from "@/src/actions/mongodbActions";
import Question from "@/src/components/question";
import AnswerContext from "@/src/components/answerContext";
import type { QuestionType } from "@/types/database";
import styles from "@/styles/globals.module.css";

type Props = {
  moduleId: string;
};

export default function QuestionModule({ moduleId }: Props) {
  const { setUserAnswers, userAnswers } = useContext(AnswerContext);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [rightAnswers, setRightAnswers] = useState<number>(0);
  let examFinished = false;

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
    setUserAnswers(new Array(questions.length));
  }, [moduleId, setUserAnswers]);

  const checkUserAnswers = () => {
    let rightAnswersOfUser = 0;
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer == questions[index].answer) {
        rightAnswersOfUser += 1;
      }
    });
    console.log("check");
    examFinished = true;
    setRightAnswers(rightAnswersOfUser);
    console.log(rightAnswersOfUser);
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
            .sort((q1, q2) => q1.number - q2.number)
            .map((question, index) => (
              <Question
                key={index}
                question={question.question}
                number={question.number}
                answer={question.answer}
                explanation={question.explanation}
                options={question.options}
                rightAnswers={rightAnswers}
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
