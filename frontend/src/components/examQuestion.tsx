import { useContext, useEffect, useState } from "react";
import type { AnswersType, QuestionType } from "@/types/database";
import styles from "@/styles/components/question.module.scss";
import ExamImage from "@/src/components/examImage";
import clsx from "clsx";
import LanguageContext from "@/src/components/context/languageContext";
import { getCookieUserAnswers, setCookieUserAnswers } from "@/utils/cookies";

type QuestionProps = {
  question: QuestionType;
  examIsFinished: boolean;
  currentQuestion: number;
};

const ExamQuestion = ({
  question,
  examIsFinished,
  currentQuestion,
}: QuestionProps) => {
  const [userAnswers, setUserAnswers] = useState<AnswersType[]>([]);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const savedUserAnswers = getCookieUserAnswers();
    if (savedUserAnswers) {
      setUserAnswers(JSON.parse(savedUserAnswers));
    }
  }, []);

  const handleAnswerChange = (id: string) => {
    const newAnswers = userAnswers;
    const questionIndex = newAnswers.findIndex(
      (answer) => answer.number === question.number,
    );
    if (questionIndex === -1) {
      newAnswers.push({ number: question.number, answer: [id] });
    } else {
      const answerIndex = newAnswers[questionIndex].answer.indexOf(id);
      if (answerIndex === -1) {
        newAnswers[questionIndex].answer.push(id);
      } else {
        newAnswers[questionIndex].answer.splice(answerIndex, 1);
      }
    }
    setCookieUserAnswers(newAnswers);
  };

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
              onClick={() => {
                handleAnswerChange(option.id);
              }}
              defaultChecked={userAnswers.some(
                (answer) =>
                  answer.number === question.number &&
                  answer.answer.includes(option.id),
              )}
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
          <h6>{"Explanation"}</h6>
          {question.explanation[lang]}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExamQuestion;
