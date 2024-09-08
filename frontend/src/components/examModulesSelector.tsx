import styles from "../../styles/components/moduleSelector.module.scss";
import ExamModules from "@/src/components/examModules";

export default function ExamModulesSelector(props: { examSections: string[] }) {
  return (
    <div className={styles.selectionContainer}>
      {props.examSections.map((section, index) => (
        <ExamModules section={section} exam={index + 1} key={section} />
      ))}
    </div>
  );
}
