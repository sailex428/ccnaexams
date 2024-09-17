import { useContext } from "react";
import type { QuestionType } from "@/types/database";
import styles from "@/styles/components/question.module.scss";
import ExamImage from "@/src/components/examImage";
import clsx from "clsx";
import AnswerContext from "@/src/components/context/answerContext";
import LanguageContext from "@/src/components/context/languageContext";

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
  const { setUserAnswers, userAnswers } = useContext(AnswerContext);
  const { lang } = useContext(LanguageContext);

  const handleAnswerChange = (id: string) => {
    const newAnswers = userAnswers;
    const questionIndex = newAnswers.findIndex(
      (answer) => answer.number === question.number,
    );
    if (questionIndex === -1) {
      console.log("Adding new answer:", {
        number: question.number,
        answer: [id],
      });
      newAnswers.push({ number: question.number, answer: [id] });
    } else {
      const answerIndex = newAnswers[questionIndex].answer.indexOf(id);
      if (answerIndex === -1) {
        console.log("Pushing answer id:", id);
        newAnswers[questionIndex].answer.push(id);
      } else {
        console.log("Splicing answer id:", id);
        newAnswers[questionIndex].answer.splice(answerIndex, 1);
      }
    }
    console.log("New answers:", newAnswers);
    setUserAnswers(newAnswers);
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
                console.log("clicked");
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
