import { Button } from "react-bootstrap";
import QuestionModule from "@/src/components/questionModule";
import styles from "@/styles/pages/modulepage.module.css";
import global from "@/styles/globals.module.css";
import { QuestionType } from "@/types/database";

export default function ModulePage({
  params,
}: {
  params: { questionId: number; moduleId: string; question: QuestionType[] };
}) {
  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <QuestionModule
          questionId={params.questionId}
          moduleId={params.moduleId}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          href={`/${params.moduleId}/${params.questionId - 1}`}
          className={global.button}
        >
          {"<"}
        </Button>
        <Button
          href={`/${params.moduleId}/${parseInt(params.questionId + "", 10) + 1}`}
          className={global.button}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}
