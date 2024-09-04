import clsx from "clsx";
import styles from "@/styles/pages/homepage.module.css";
import ExamsNavbar from "@/src/components/examsNavbar";

export default function Homepage() {
  return (
    <main className={styles.mainBackground}>
      <ExamsNavbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={clsx(styles.headline, styles.type, "defaultText")}>
            Learn the
          </h1>
          <h1
            className={clsx(
              styles.headline,
              styles.typeAndDelete,
              "defaultText",
            )}
          >
            CCNA Exam Questions.
          </h1>
        </div>
      </div>
    </main>
  );
}
