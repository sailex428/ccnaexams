"use client";

import styles from "../../styles/components/moduleSelector.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDetail } from "@/src/app/api/actions";
import { useContext, useState } from "react";
import LanguageContext from "@/src/components/languageContext";
import { Spinner } from "react-bootstrap";

export default function ExamModules(modules: {
  section: string;
  exam: number;
}) {
  const { lang } = useContext(LanguageContext);
  const { details, isLoading, isError } = useDetail(`${modules.exam}`);
  const [openSection, setOpenSection] = useState<number>(0);

  const handleClick = () => {
    setOpenSection(modules.exam === openSection ? 0 : modules.exam);
  };

  return (
    <div className={styles.examContainer}>
      <div className={styles.examSection} onClick={() => handleClick()}>
        <div className={clsx(styles.examText, "defaultText")}>
          {modules.section}
        </div>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={clsx(styles.dropDownButton, {
            [styles.rotate]: modules.exam === openSection,
          })}
        />
      </div>
      {modules.exam === openSection && (
        <>
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {isError && <div className="fw-bold mt-4">An Error occurred</div>}
          {details.length !== 0 && (
            <div className={styles.module}>
              {details.map((detail) => {
                return (
                  <div className={styles.moduleContent} key={detail.module}>
                    <div className={clsx(styles.moduleText, "defaultText")}>
                      {detail.module}
                      {": "}
                      {detail.title[lang]}
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
