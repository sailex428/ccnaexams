import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import styles from "@/styles/components/navigationButton.module.scss";

type ExamNavigationButtonsProps = {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPreviousQuestion: () => void;
  onNextQuestion: () => void;
};

const ExamNavigationButtons = ({
  currentQuestionIndex,
  totalQuestions,
  onPreviousQuestion,
  onNextQuestion,
}: ExamNavigationButtonsProps) => {
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
