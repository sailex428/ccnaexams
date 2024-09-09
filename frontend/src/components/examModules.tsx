"use client";

import React, { useRef } from "react";
import styles from "../../styles/components/moduleSelector.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDetail } from "@/src/app/api/actions";
import { useContext, useState } from "react";
import LanguageContext from "@/src/components/languageContext";
import { Spinner } from "react-bootstrap";
import Link from "next/link";

export default function ExamModules(modules: {
  section: string;
  exam: number;
}) {
  const { lang } = useContext(LanguageContext);
  const { details, isLoading, isError } = useDetail(`${modules.exam}`);
  const [openSection, setOpenSection] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const isOpening = modules.exam !== openSection;
    setOpenSection(isOpening ? modules.exam : 0);
    if (isOpening && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
      <div
        className={clsx(styles.module, {
          [styles.open]: modules.exam === openSection,
        })}
      >
        {isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {isError && (
          <div className="mx-3 mt-2 fw-bold defaultText">
            An Error occurred.
          </div>
        )}
        {details && (
          <div>
            {details.map((detail) => (
              <Link
                className={styles.moduleContent}
                key={detail.module}
                href={`/${modules.exam}/${detail.module}`}
              >
                <div className={clsx(styles.moduleText, "defaultText")}>
                  {detail.module}
                  {": "}
                  {detail.title[lang]}
                </div>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
