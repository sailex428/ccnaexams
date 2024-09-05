import clsx from "clsx";
import { useRouter } from "next/navigation";
import styles from "@/styles/components/footer.module.css";
import { Button } from "react-bootstrap";
import { PROPERTIES } from "@/src/components/lib/static";
import { useContext } from "react";
import LanguageContext from "@/src/components/languageContext";

export default function ResultFooter(props: { moduleId: string }) {
  const router = useRouter();
  const { lang } = useContext(LanguageContext);
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Button
          className={clsx("button")}
          onClick={() => {
            router.push(`/${props.moduleId}/1`);
          }}
        >
          {PROPERTIES.resultFooterButton[lang]}
        </Button>
      </div>
    </footer>
  );
}
