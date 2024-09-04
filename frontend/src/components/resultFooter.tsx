import { useRouter } from "next/navigation";
import styles from "@/styles/components/footer.module.css";
import { Button } from "react-bootstrap";
import global from "@/styles/globals.css";
import { properties } from "@/src/components/lib/static";
import { useContext } from "react";
import LanguageContext from "@/src/components/languageContext";

export default function ResultFooter(props: { moduleId: string }) {
  const router = useRouter();
  const { lang } = useContext(LanguageContext);
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Button
          className={global.button}
          onClick={() => {
            router.push(`/${props.moduleId}/1`);
          }}
        >
          {properties.resultFooterButton[lang]}
        </Button>
      </div>
    </footer>
  );
}
