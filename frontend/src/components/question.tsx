import { useContext } from "react";
import { Form } from "react-bootstrap";
import AnswerContext from "@/src/components/answerContext";
import type { QuestionType } from "@/types/database";
import styles from "@/styles/question.module.css";

type QuestionProps = {
  question: QuestionType;
  examIsFinished: boolean;
};

export default function Question(props: QuestionProps) {
  const { setUserAnswers, userAnswers } = useContext(AnswerContext);
  const currentQuestion = props.question;

  const handleAnswerChange = (number: number, newUserAnswer: string) => {
    const newUserAnswers = userAnswers;
    let currentAnswer = userAnswers[number - 1];
    console.log(currentAnswer);
    if (currentAnswer == null) {
      currentAnswer = new Array(newUserAnswer);
      console.log(newUserAnswer);
    } else {
      currentAnswer.push(newUserAnswer);
    }
    newUserAnswers[number - 1] = currentAnswer;
    console.log(newUserAnswers);
    setUserAnswers(newUserAnswers);
  };

  return (
    <div className={styles.container}>
      <Form>
        <h6 className="fw-bold">
          {currentQuestion.number}
          {". "}
          {currentQuestion.question}
        </h6>
        {currentQuestion.options.map((option, index) => (
          <Form.Check key={index}>
            <Form.Check.Input
              type={currentQuestion.type}
              name={"group"}
              onChange={() =>
                handleAnswerChange(currentQuestion.number, option)
              }
              isValid={
                props.examIsFinished
                  ? currentQuestion.answer[0] == option
                  : false
              }
              isInvalid={
                props.examIsFinished
                  ? userAnswers[currentQuestion.number - 1] !=
                    currentQuestion.answer
                  : false
              }
            ></Form.Check.Input>
            <Form.Check.Label>{option}</Form.Check.Label>
          </Form.Check>
        ))}
        {props.examIsFinished && currentQuestion.explanation ? (
          <div className={styles.explanation}>
            <h6>{"Explanation: "}</h6>
            {currentQuestion.explanation}
          </div>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
}
