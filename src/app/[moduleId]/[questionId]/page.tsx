import QuestionModule from "@/src/components/questionModule";
import styles from "@/styles/pages/modulepage.module.css";
export default function ModulePage({
  params,
}: {
  params: { questionId: number };
}) {
  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <QuestionModule questionId={params.questionId} />
      </div>
    </div>
  );
}
