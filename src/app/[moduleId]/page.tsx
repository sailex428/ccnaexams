import QuestionModule from "@/src/components/questionModule";
import styles from "@/styles/pages/modulepage.module.css";
export default function ModulePage({
  params,
}: {
  params: { moduleId: string };
}) {
  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>
        {"CCNA 1 Exams Module " + params.moduleId}
      </h2>
      <div className={styles.questions}>
        <QuestionModule moduleId={params.moduleId} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [{ id: "11-13" }];
}
