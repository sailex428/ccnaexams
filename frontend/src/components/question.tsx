import { useContext } from "react";
import { Form } from "react-bootstrap";
import AnswerContext from "@/src/components/answerContext";
import type { QuestionType } from "@/types/database";
import styles from "@/styles/components/question.module.css";
import ExamImage from "@/src/components/examImage";

type QuestionProps = {
  question: QuestionType;
  examIsFinished: boolean;
};

export default function Question(props: QuestionProps) {
  const { setUserAnswers, userAnswers } = useContext(AnswerContext);
  const currentQuestion = props.question;
  let currentUserAnswers = userAnswers.find(
    (answer) => parseInt(answer?.number) == parseInt(currentQuestion.number),
  )?.answers;

  const handleAnswerChange = (newUserAnswer: string) => {
    const newUserAnswers = userAnswers;

    if (newUserAnswers === undefined) {
      return;
    }

    if (currentUserAnswers == null || currentQuestion.type == "radio") {
      currentUserAnswers = new Array(newUserAnswer);
    } else {
      if (!currentUserAnswers.includes(newUserAnswer)) {
        currentUserAnswers.push(newUserAnswer);
      } else {
        currentUserAnswers.splice(currentUserAnswers.indexOf(newUserAnswer), 1);
      }
    }
    newUserAnswers[parseInt(currentQuestion.number)] = {
      answers: currentUserAnswers,
      number: currentQuestion.number,
    };
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
        <ExamImage image={currentQuestion.image} />
        {currentQuestion.options.map((option, index) => (
          <Form.Check key={index}>
            <Form.Check.Input
              type={currentQuestion.type}
              name={"group"}
              onChange={() => handleAnswerChange(option)}
              defaultChecked={
                currentUserAnswers != null
                  ? currentUserAnswers.includes(option)
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
