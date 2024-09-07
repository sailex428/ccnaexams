import clsx from "clsx";
import styles from "../../styles/components/moduleSelector.module.css";
import { PROPERTIES } from "@/src/components/lib/static";
import { useProperties } from "./hooks/useProperties";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const {
  MODULE_SELECTOR: { MODULE_SELECTOR_EXAM_SECTION },
} = PROPERTIES;

export default function ModuleSelector() {
  const [examSection] = useProperties([MODULE_SELECTOR_EXAM_SECTION]);
  return (
    <div className={styles.selectionContainer}>
      {examSection.map((section) => (
        <div className={styles.examSection} key={section}>
          <div className={clsx(styles.examText, "defaultText")}>{section}</div>
          <FontAwesomeIcon
            icon={faAngleDown}
            className={styles.dropDownButton}
          />
        </div>
      ))}
    </div>
  );
}
