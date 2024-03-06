import QuestionModule from "@/src/components/questionModule";
import styles from "@/styles/pages/modulepage.module.css";
import { Col } from "react-bootstrap";
export default function ModulePage({
  params,
}: {
  params: { moduleId: string };
}) {
  return (
    <Col className="content px-0 mx-auto h-100">
      <div className={styles.wrapper}>
        <h2 className={styles.headline}>
          {"CCNA Exams Module " + params.moduleId}
        </h2>
        <QuestionModule moduleId={params.moduleId} />
      </div>
    </Col>
  );
}
