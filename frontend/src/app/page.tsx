import clsx from "clsx";
import styles from "@/styles/pages/homepage.module.scss";
import { useProperties } from "@/src/components/hooks/useProperties";
import { PROPERTIES } from "@/src/components/lib/static";
import ExamModulesSelector from "@/src/components/examModulesSelector";

const {
  HOMEPAGE: { HOMEPAGE_HEADLINE_TITLE, HOMEPAGE_HEADLINE_SUBTITLE },
  MODULE_SELECTOR: { MODULE_SELECTOR_EXAM_SECTION },
} = PROPERTIES;

export default function Homepage() {
  const [title, subTitle, examSections] = useProperties([
    HOMEPAGE_HEADLINE_TITLE,
    HOMEPAGE_HEADLINE_SUBTITLE,
    MODULE_SELECTOR_EXAM_SECTION,
  ]);
  return (
    <>
      <div className={styles.mainBackground}>
        <video className={styles.videoBackground} autoPlay loop muted>
          <source src="/videos/dotsWave.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
          </div>
        </div>
      </div>
      <div className={styles.moduleSelector}>
        <ExamModulesSelector examSections={examSections} />
      </div>
    </>
  );
}
