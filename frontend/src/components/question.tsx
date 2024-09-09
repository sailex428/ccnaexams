import { useContext } from "react";
import { Form } from "react-bootstrap";
import AnswerContext from "@/src/components/answerContext";
import type { QuestionType } from "@/types/database";
import styles from "@/styles/components/question.module.scss";
import ExamImage from "@/src/components/examImage";
import LanguageContext from "@/src/components/languageContext";
import { PROPERTIES } from "@/src/components/lib/static";

type QuestionProps = {
  question: QuestionType;
  examIsFinished: boolean;
};

export default function Question({ question, examIsFinished }: QuestionProps) {
  const { setUserAnswers } = useContext(AnswerContext);
  const { lang } = useContext(LanguageContext);

  const handleAnswerChange = (id: string) => {
    setUserAnswers((prevUserAnswers = []) =>
      prevUserAnswers.length === 0
        ? [{ answer: [id], number: question.number }]
        : prevUserAnswers.map((answer) =>
            answer.number === question.number
              ? {
                  ...answer,
                  answer: answer.answer.includes(id)
                    ? answer.answer.filter((a) => a !== id)
                    : [...answer.answer, id],
                }
              : answer,
          ),
    );
  };

  return (
    <div className={styles.container}>
      <Form>
        <h5 className="fw-bold">
          {question.number}
          {". "}
          {question.question[lang]}
        </h5>
        <ExamImage img={question.img} />
        {question.options.map((option, index) => (
          <Form.Check key={index}>
            <Form.Check.Input
              type={question.type}
              name={"group"}
              onChange={() => handleAnswerChange(option.id)}
              className={styles.checkbox}
            ></Form.Check.Input>
            <Form.Check.Label className={styles.optionLabel}>
              {option[lang]}
            </Form.Check.Label>
          </Form.Check>
        ))}
        {examIsFinished && question.explanation[lang] ? (
          <div className={styles.explanation}>
            <h6>{PROPERTIES.questionPageExplanation[lang]}</h6>
            {question.explanation[lang]}
          </div>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
}
