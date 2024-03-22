import { useContext } from "react";
import { Form, FormCheck } from "react-bootstrap";
import type { QuestionType } from "@/types/database";
import AnswerContext from "@/src/components/answerContext";
import styles from "@/styles/question.module.css";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import ExamImage from "@/src/components/examImage";

type Props = {
  number: number;
  question: QuestionType;
  examFinished: boolean;
};
export default function Question(question: Props) {
  const { setUserAnswers, userAnswers } = useContext(AnswerContext);
  const currentQuestion = question.question;

  const handleAnswerChange = (number: number, userAnswer: string) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[number - 1] = userAnswer;
    setUserAnswers(newUserAnswers);
  };

  return (
    <Form className={styles.container}>
      <h6 className={styles.heading}>
        {question.number}
        {". "}
        {currentQuestion.question}
      </h6>
      <div className={styles.options}>
        <div className={styles.answerContainer}>
          {currentQuestion.options.map((option, index) => (
            <FormCheck key={index}>
              <FormCheckInput
                type={currentQuestion.type}
                name={"group"}
                onChange={() =>
                  handleAnswerChange(currentQuestion.number, option)
                }
                isValid={
                  question.examFinished
                    ? currentQuestion.answer == option
                    : false
                }
                isInvalid={
                  question.examFinished
                    ? userAnswers[currentQuestion.number - 1] !=
                      currentQuestion.answer
                    : false
                }
              ></FormCheckInput>
              <FormCheckLabel className={styles.answer}>
                {option}
              </FormCheckLabel>
            </FormCheck>
          ))}
        </div>
        <ExamImage img={currentQuestion.img} />
      </div>
      {question.examFinished && currentQuestion.explanation ? (
        <div className={styles.explanation}>
          <h6>{"Explanation: "}</h6>
          {currentQuestion.explanation}
        </div>
      ) : (
        <></>
      )}
    </Form>
  );
}
