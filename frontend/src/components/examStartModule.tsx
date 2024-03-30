import { Button } from "react-bootstrap";
import stylesGlobal from "@/styles/globals.module.css";
import styles from "@/styles/pages/modulepage.module.css";

type Props = {
  moduleId: string;
};

export default function ExamStartModule({ moduleId }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>{"Module " + moduleId}</h2>
      <Button
        href={"/" + moduleId + "/1"}
        variant="primary"
        size="sm"
        className={stylesGlobal.button}
      >
        Start the Exam
      </Button>
    </div>
  );
}
