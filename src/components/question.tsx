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
        {options.map((option) => (
          <Form.Check key="">
            <Form.Check.Input
              type={"radio"}
              name={"group"}
              onChange={() => handleAnswerChange(number, option)}
              isValid={rightAnswers != 0 ? answer == option : false}
              isInvalid={
                rightAnswers != 0 ? userAnswers[number - 1] != answer : false
              }
            ></Form.Check.Input>
            <Form.Check.Label>{option}</Form.Check.Label>
          </Form.Check>
        ))}
        {rightAnswers != 0 && explanation ? (
          <div className={styles.explanation}>
            <h6 className={"fw-bold"}>{"Explanation: "}</h6>
            {explanation}
          </div>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
}
