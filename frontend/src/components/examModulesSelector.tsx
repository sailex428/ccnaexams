"use client";

import styles from "../../styles/components/moduleSelector.module.scss";
import ExamModules from "@/src/components/examModules";
import { Spinner } from "react-bootstrap";
import React from "react";
import clsx from "clsx";
import { useExams } from "@/src/components/hook/useExams";

const ExamModulesSelector = () => {
  const { exams, isError, isLoading } = useExams();

  if (isLoading) {
    return (
      <div className={clsx(styles.selectionContainer, styles.spinnerBorder)}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={clsx(styles.selectionContainer, styles.spinnerBorder)}>
        <div
          className={clsx(
            styles.selectionContainer,
            styles.errorText,
            "defaultText",
          )}
        >
          An Error occurred
        </div>
      </div>
    );
  }

  return (
    <div className={styles.selectionContainer}>
      {exams.map((exam, index) => (
        <ExamModules section={exam.title} exam={exam.exam} key={index} />
      ))}
    </div>
  );
};

export default ExamModulesSelector;
