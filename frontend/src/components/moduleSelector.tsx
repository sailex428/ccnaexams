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
      <button className={styles.dropDownButton}>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <div className={clsx(styles.examSection, "defaultText")}>
        {examSection}
      </div>
    </div>
  );
}
