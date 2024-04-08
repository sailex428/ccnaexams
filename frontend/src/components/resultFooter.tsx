import { useRouter } from "next/navigation";
import styles from "@/styles/components/footer.module.css";
import { Button } from "react-bootstrap";
import global from "@/styles/globals.module.css";

export default function ResultFooter(props: { moduleId: string }) {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div></div>
        <Button
          title={"solution"}
          className={global.button}
          onClick={() => {
            router.push(`/${props.moduleId}/1`);
          }}
        >
          {"Lösung"}
        </Button>
      </div>
    </footer>
  );
}
