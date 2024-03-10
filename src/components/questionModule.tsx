"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getQuestionsOfModule } from "@/src/actions/mongodbActions";
import type { QuestionModule } from "@/types/database";
import Question from "@/src/components/question";
import styles from "@/styles/globals.module.css";
import AnswerContext from "@/src/components/answerContext";
import ExamResults from "@/src/components/examResults";

type Props = {
  moduleId: string;
};

export default function QuestionModule({ moduleId }: Props) {
  const { setUserAnswers, userAnswers } = useContext(AnswerContext);
  const [questions, setQuestions] = useState<QuestionModule[]>([]);
  const [rightAnswers, setRightAnswers] = useState<number>(0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const questionsData = await getQuestionsOfModule(moduleId);
        setQuestions(questionsData);
      } catch (error) {
        console.log("error reading data from database:", error);
      }
    }
    fetchQuestions();
    setUserAnswers(new Array(questions.length));
  }, [moduleId, questions.length, setUserAnswers]);

  const checkUserAnswers = () => {
    let rightAnswersOfUser = 0;
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer == questions[index].answer) {
        rightAnswersOfUser += 1;
      }
    });
    setRightAnswers(rightAnswersOfUser);
  };

  return (
    <div>
      {questions.length > 0 ? (
        <>
          {rightAnswers != 0 ? (
            <ExamResults
              rightAnswers={rightAnswers}
              length={questions.length}
            />
          ) : (
            <></>
          )}
          {questions
            .sort((q1, q2) => q1.number - q2.number)
            .map((question) => (
              <Question
                key=""
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
            onClick={checkUserAnswers}
          >
            Check Answers
          </Button>
        </>
      ) : (
        <div className="fw-bold">Loading...</div>
      )}
    </div>
  );
}
