import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import styles from "@/styles/pages/questionpage.module.scss";

type NavigationButtonsProps = {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPreviousQuestion: () => void;
  onNextQuestion: () => void;
};

const NavigationButtons = ({
  currentQuestionIndex,
  totalQuestions,
  onPreviousQuestion,
  onNextQuestion,
}: NavigationButtonsProps) => {
  return (
    <div className={styles.buttonContainer}>
      {currentQuestionIndex > 0 && (
        <button className={clsx(styles.button)} onClick={onPreviousQuestion}>
          <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowIcon} />
        </button>
      )}
      {currentQuestionIndex < totalQuestions - 1 && (
        <button className={clsx(styles.button)} onClick={onNextQuestion}>
          <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
