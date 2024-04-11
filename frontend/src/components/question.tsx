import { useContext } from "react";
import { Form } from "react-bootstrap";
import AnswerContext from "@/src/components/answerContext";
import type { QuestionType } from "@/types/database";
import styles from "@/styles/components/question.module.css";
import ExamImage from "@/src/components/examImage";
import LanguageContext from "@/src/components/languageContext";
import { properties } from "@/src/components/lib/static";

type QuestionProps = {
  question: QuestionType;
  examIsFinished: boolean;
};

export default function Question(props: QuestionProps) {
  const { setUserAnswers, userAnswers } = useContext(AnswerContext);
  const { lang } = useContext(LanguageContext);
  const currentQuestion = props.question;
  let currentUserAnswers = userAnswers.find(
    (answer) => answer?.number == currentQuestion.number,
  )?.answer;

  const handleAnswerChange = (newUserAnswer: string) => {
    const newUserAnswers = userAnswers;

    if (newUserAnswers === undefined) {
      return;
    }

    if (currentUserAnswers == null || currentQuestion.type == "radio") {
      currentUserAnswers = {
        de: new Array(newUserAnswer),
        en: new Array(newUserAnswer),
      };
    } else {
      if (!currentUserAnswers[lang].includes(newUserAnswer)) {
        currentUserAnswers[lang].push(newUserAnswer);
      } else {
        currentUserAnswers[lang].splice(
          currentUserAnswers[lang].indexOf(newUserAnswer),
          1,
        );
      }
    }
    newUserAnswers[parseInt(currentQuestion.number)] = {
      answer: currentUserAnswers,
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
          {currentQuestion.question[lang]}
        </h6>
        <ExamImage img={currentQuestion.img} />
        {currentQuestion.options[lang].map((option, index) => (
          <Form.Check key={index}>
            <Form.Check.Input
              type={currentQuestion.type}
              name={"group"}
              onChange={() => handleAnswerChange(option)}
              defaultChecked={
                currentUserAnswers != null
                  ? currentUserAnswers[lang].includes(option)
                  : false
              }
              isValid={
                props.examIsFinished
                  ? currentQuestion.answer[lang].includes(option)
                  : false
              }
              isInvalid={
                props.examIsFinished
                  ? !currentQuestion.answer[lang].includes(option)
                  : false
              }
            ></Form.Check.Input>
            <Form.Check.Label>{option}</Form.Check.Label>
          </Form.Check>
        ))}
        {props.examIsFinished && currentQuestion.explanation[lang] ? (
          <div className={styles.explanation}>
            <h6>{properties.questionPageExplanation[lang]}</h6>
            {currentQuestion.explanation[lang]}
          </div>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
}
