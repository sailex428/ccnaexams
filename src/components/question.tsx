import { useContext } from "react";
import { Form } from "react-bootstrap";
import type { QuestionType } from "@/types/database";
import AnswerContext from "@/src/components/answerContext";
import styles from "@/styles/question.module.css";

export default function Question({
  number,
  question,
  options,
  answer,
  explanation,
  rightAnswers,
}: QuestionType & { rightAnswers: number }) {
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
              isValid={rightAnswers ? answer == option : false}
              isInvalid={
                rightAnswers ? userAnswers[number - 1] != answer : false
              }
            ></Form.Check.Input>
            <Form.Check.Label>{option}</Form.Check.Label>
          </Form.Check>
        ))}
        {rightAnswers && explanation ? (
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
