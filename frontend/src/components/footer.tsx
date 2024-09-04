"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import global from "@/styles/globals.css";
import styles from "@/styles/components/footer.module.css";
import AnswerContext from "@/src/components/answerContext";

type FooterProps = {
  questionId: number;
  moduleId: string;
};

export default function Footer({ questionId, moduleId }: FooterProps) {
  const router = useRouter();
  const { examIsFinished, numberOfQuestions } = useContext(AnswerContext);
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {questionId > 1 ? (
          <Button
            title={"back"}
            className={global.button}
            onClick={() => {
              router.push(`/${moduleId}/${questionId - 1}`);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        ) : examIsFinished ? (
          <div></div>
        ) : (
          <></>
        )}
        {!examIsFinished ? (
          <Button
            title={"show result"}
            className={global.button}
            onClick={() => {
              router.push(`/${moduleId}/result`);
            }}
          >
            <FontAwesomeIcon icon={faFlagCheckered} />
          </Button>
        ) : (
          <></>
        )}
        {questionId < numberOfQuestions ? (
          <Button
            title={"next"}
            className={global.button}
            onClick={() => {
              router.push(`/${moduleId}/${parseInt(questionId + "") + 1}`);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        ) : (
          <></>
        )}
      </div>
    </footer>
  );
}
