"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "@/types/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import global from "@/styles/globals.module.css";
import styles from "@/styles/components/footer.module.css";
import AnswerContext from "@/src/components/answerContext";

type FooterProps = {
  params: { questionId: number; moduleId: string; question: QuestionType[] };
};

export default function Footer({ params }: FooterProps) {
  const router = useRouter();
  const { examIsFinished, setExamIsFinished, numberOfQuestions } =
    useContext(AnswerContext);
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {params.questionId > 1 ? (
          <Button
            title={"back"}
            className={global.button}
            onClick={() => {
              router.push(`/${params.moduleId}/${params.questionId - 1}`);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        ) : (
          <></>
        )}
        {examIsFinished ? (
          <></>
        ) : (
          <Button
            title={"show result"}
            className={global.button}
            onClick={() => {
              router.push(`/${params.moduleId}/result`);
              setExamIsFinished(true);
            }}
          >
            <FontAwesomeIcon icon={faFlagCheckered} />
          </Button>
        )}
        {params.questionId < numberOfQuestions ? (
          <Button
            title={"next"}
            className={global.button}
            onClick={() => {
              router.push(
                `/${params.moduleId}/${parseInt(params.questionId + "") + 1}`,
              );
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
