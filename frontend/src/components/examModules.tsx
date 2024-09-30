import React, { useRef } from "react";
import styles from "../../styles/components/moduleSelector.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { Spinner } from "react-bootstrap";
import Link from "next/link";
import LanguageContext from "@/src/components/context/languageContext";
import { useDetail } from "@/src/components/hook/useDetails";
import {
  setCookieCurrentQuestion,
  setCookieExamIsFinished,
  setCookieQuestionOrder,
  setCookieUserAnswers,
} from "@/utils/cookies";

const ExamModules = (modules: { section: string; exam: string }) => {
  const { lang } = useContext(LanguageContext);
  const { details, isLoading, isError } = useDetail(`${modules.exam}`);
  const [openSection, setOpenSection] = useState<string>("");
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const isOpening = modules.exam !== openSection;
    setOpenSection(isOpening ? modules.exam : "");
    if (isOpening && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.examContainer} ref={sectionRef}>
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
          <div className={"my-2 mx-3"}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {isError && (
          <div className="my-2 mx-3 fw-bold defaultText">
            An Error occurred.
          </div>
        )}
        {details.length !== 0 && (
          <div className={styles.moduleContentWrapper}>
            {details.map((detail) => (
              <Link
                className={styles.moduleContent}
                key={detail.module}
                href={`/${modules.exam}/${detail.module}`}
                onClick={() => {
                  setCookieExamIsFinished(false);
                  setCookieUserAnswers();
                  setCookieCurrentQuestion(0);
                  setCookieQuestionOrder();
                }}
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
};

export default ExamModules;
