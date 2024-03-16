import type { QuestionType } from "@/types/database";
import { Form } from "react-bootstrap";
import { useContext } from "react";
import AnswerContext from "@/src/components/answerContext";
import styles from "@/styles/question.module.css";

export default function Question({
  number,
  question,
  options,
  answer,
  explanation,
  examIsFinished,
}: QuestionType & { examIsFinished: boolean }) {
  const { setUserAnswers, userAnswers } = useContext(AnswerContext);

  const handleAnswerChange = (number: number, userAnswer: string) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[number - 1] = userAnswer;
    setUserAnswers(newUserAnswers);
  };

  return (
    <div className={styles.container}>
      <Form>
        <h6 className="fw-bold">
          {number}
          {". "}
          {question}
        </h6>
        {options.map((option, index) => (
          <Form.Check key={index}>
            <Form.Check.Input
              type={"radio"}
              name={"group"}
              onChange={() => handleAnswerChange(number, option)}
              isValid={examIsFinished ? answer == option : false}
              isInvalid={
                examIsFinished ? userAnswers[number - 1] != answer : false
              }
            ></Form.Check.Input>
            <Form.Check.Label>{option}</Form.Check.Label>
          </Form.Check>
        ))}
        {examIsFinished && explanation ? (
          <div className={styles.explanation}>
            <h6>{"Explanation: "}</h6>
            {explanation}
          </div>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
}
