import clsx from "clsx";
import styles from "@/styles/pages/homepage.module.scss";
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
    <>
      <div className={styles.mainBackground}>
        <video className={styles.videoBackground} autoPlay loop muted>
          <source src="/videos/dotsWave.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
          </div>
        </div>
      </div>
      <div className={styles.moduleSelector}>
        <ModuleSelector />
      </div>
    </>
  );
}
