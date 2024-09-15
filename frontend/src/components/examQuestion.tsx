import { useContext } from "react";
import type { QuestionType } from "@/types/database";
import styles from "@/styles/components/question.module.scss";
import ExamImage from "@/src/components/examImage";
import { PROPERTIES } from "@/src/components/lib/static";
import clsx from "clsx";
import AnswerContext from "@/src/components/context/answerContext";
import LanguageContext from "@/src/components/context/languageContext";

type QuestionProps = {
  question: QuestionType;
  examIsFinished: boolean;
  currentQuestion: number;
};

export default function ExamQuestion({
  question,
  examIsFinished,
  currentQuestion,
}: QuestionProps) {
  const { setUserAnswers } = useContext(AnswerContext);
  const { lang } = useContext(LanguageContext);

  const handleAnswerChange = (id: string) => {};

  return (
    <>
      <h5 className={clsx(styles.heading, "defaultText")}>
        {`${currentQuestion + 1}. ${question.question[lang]}`}
      </h5>
      <ExamImage img={question.img} />
      <div className={styles.optionContainer}>
        {question.options.map((option) => (
          <div key={option.id}>
            <input
              type={"checkbox"}
              id={option.id}
              className={styles.hidden}
              onChange={() => handleAnswerChange(option.id)}
            />
            <label
              htmlFor={option.id}
              className={clsx(styles.optionLabel, "defaultText")}
            >
              {option[lang]}
            </label>
          </div>
        ))}
      </div>
      {examIsFinished && question.explanation[lang] ? (
        <div className={styles.explanation}>
          <h6>{PROPERTIES.questionPageExplanation[lang]}</h6>
          {question.explanation[lang]}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
