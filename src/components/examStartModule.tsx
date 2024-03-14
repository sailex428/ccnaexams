import { useContext } from "react";
import { Button } from "react-bootstrap";
import ModuleContext from "@/src/components/moduleContext";
import stylesGlobal from "@/styles/globals.module.css";
import styles from "@/styles/pages/modulepage.module.css";

type Props = {
  moduleId: string;
};

export default function ExamStartModule({ moduleId }: Props) {
  const { setModule } = useContext(ModuleContext);
  const handleClick = () => {
    setModule(moduleId);
    console.log("test");
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>{"CCNA 1 Exams Module " + moduleId}</h2>
      <Button
        href={"/" + moduleId + "/1"}
        variant="primary"
        size="sm"
        className={stylesGlobal.button}
        onClick={() => handleClick}
      >
        Start the Exam
      </Button>
    </div>
  );
}
