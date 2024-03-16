import { Button } from "react-bootstrap";
import QuestionModule from "@/src/components/questionModule";
import { getQuestionsOfModule } from "@/src/app/api/mongodbActions";
import { QuestionType } from "@/types/database";
import styles from "@/styles/pages/modulepage.module.css";
import global from "@/styles/globals.module.css";

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
          href={`/${params.moduleId}/${parseInt(params.questionId + "") + 1}`}
          className={global.button}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}

export async function generateStaticParams({
  params,
}: {
  params: { questionId: number; moduleId: string; question: QuestionType[] };
}) {
  async function fetchQuestionsCount() {
    const questionModule = await getQuestionsOfModule(params.moduleId);
    return questionModule.length;
  }
  const questionCount = await fetchQuestionsCount();
  let staticParams = [];
  for (let i = 1; i < questionCount; i++) {
    staticParams.push({ moduleId: params.moduleId }, { questionId: i });
  }
  return staticParams;
}
