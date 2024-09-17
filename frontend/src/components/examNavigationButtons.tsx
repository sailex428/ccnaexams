import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import styles from "@/styles/components/navigationButton.module.scss";
import React from "react";
import { useRouter } from "next/navigation";

type ExamNavigationButtonsProps = {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPreviousQuestion: () => void;
  onNextQuestion: () => void;
  params: {
    examId: string;
    moduleId: string;
  };
};

const ExamNavigationButtons = ({
  currentQuestionIndex,
  totalQuestions,
  onPreviousQuestion,
  onNextQuestion,
  params,
}: ExamNavigationButtonsProps) => {
  const router = useRouter();

  return (
    <div className={styles.buttonContainer}>
      {currentQuestionIndex > 0 ? (
        <button
          className={clsx(styles.button)}
          onClick={onPreviousQuestion}
          title={"Previous"}
        >
          <FontAwesomeIcon icon={faArrowLeft} className={"defaultIcon"} />
        </button>
      ) : (
        <div></div>
      )}
      <button
        className={styles.examResultButton}
        onClick={() => {
          router.push(`/${params.examId}/${params.moduleId}/result`);
        }}
        title={"Finish"}
      >
        <FontAwesomeIcon className={"defaultIcon"} icon={faFlag} />
      </button>
      {currentQuestionIndex < totalQuestions - 1 ? (
        <button
          className={clsx(styles.button)}
          onClick={onNextQuestion}
          title={"Next"}
        >
          <FontAwesomeIcon icon={faArrowRight} className={"defaultIcon"} />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ExamNavigationButtons;
