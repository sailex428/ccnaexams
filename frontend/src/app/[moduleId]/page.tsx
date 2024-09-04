"use client";

import clsx from "clsx";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import styles from "@/styles/pages/modulepage.module.css";
import AnswerContext from "@/src/components/answerContext";
import LanguageContext from "@/src/components/languageContext";
import { properties } from "@/src/components/lib/static";
import { useDetail } from "@/src/app/api/actions";

export default function StartExamPage({
  params,
}: {
  params: { moduleId: string };
}) {
  const router = useRouter();
  const { setExamIsFinished, setNumberOfQuestions } = useContext(AnswerContext);
  const { lang } = useContext(LanguageContext);

  const { detail, isLoading, isError } = useDetail(params.moduleId);

  useEffect(() => {
    setExamIsFinished(false);
    setNumberOfQuestions(detail.numberOfQuestions);
  });

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className="fw-bold mt-4">Module is loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <div className="fw-bold mt-4">An Error occurred</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2
        className={styles.headline}
      >{`Module ${params.moduleId} : ${detail.title[lang]}`}</h2>
      <div className={styles.info}>
        <p>
          {properties.modulePageText[lang].replace(
            "${title}",
            detail.title[lang],
          )}
        </p>
        <Button
          variant="primary"
          className={clsx("button")}
          onClick={() => {
            router.push(`/${params.moduleId}/1`);
          }}
        >
          {properties.modulePageButton[lang]}
        </Button>
      </div>
    </div>
  );
}
