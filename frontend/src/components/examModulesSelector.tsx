"use client";

import styles from "../../styles/components/moduleSelector.module.scss";
import ExamModules from "@/src/components/examModules";
import { useExams } from "@/src/app/api/actions";
import { Spinner } from "react-bootstrap";
import React from "react";

export default function ExamModulesSelector() {
  const { exams, isError, isLoading } = useExams();

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return <div className={styles.selectionContainer}>An Error occurred</div>;
  }

  return (
    <div className={styles.selectionContainer}>
      {exams.map((exam, index) => (
        <ExamModules section={exam.title} exam={exam.exam} key={index} />
      ))}
    </div>
  );
}
