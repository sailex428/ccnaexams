import clsx from "clsx";
import styles from "@/styles/pages/homepage.module.css";
import ExamsNavbar from "@/src/components/examsNavbar";
import { useProperties } from "@/src/components/hooks/useProperties";
import { PROPERTIES } from "@/src/components/lib/static";
import ModuleSelector from "@/src/components/moduleSelector";

const {
  HOMEPAGE: { HOMEPAGE_HEADLINE_TITLE, HOMEPAGE_HEADLINE_SUBTITLE },
} = PROPERTIES;

export default function Homepage() {
  const [title, subTitle] = useProperties([
    HOMEPAGE_HEADLINE_TITLE,
    HOMEPAGE_HEADLINE_SUBTITLE,
  ]);
  return (
    <main className={styles.mainBackground}>
      <ExamsNavbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={clsx(styles.headline, styles.type, "defaultText")}>
            {title}
          </h1>
          <h1
            className={clsx(
              styles.headline,
              styles.typeAndDelete,
              "defaultText",
            )}
          >
            {subTitle}
          </h1>
          <ModuleSelector />
        </div>
      </div>
    </main>
  );
}
