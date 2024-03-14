import QuestionModule from "@/src/components/questionModule";
import styles from "@/styles/pages/modulepage.module.css";
export default function ModulePage({
  params,
}: {
  params: { questionId: number; moduleId: string };
}) {
  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <QuestionModule
          moduleId={params.moduleId}
          questionId={params.questionId}
        />
      </div>
    </div>
  );
}
