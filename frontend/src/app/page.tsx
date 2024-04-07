import { properties } from "@/src/components/lib/static";
import styles from "@/styles/pages/homepage.module.css";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.headline}>{properties.newsTitle}</h2>
        {properties.newsEntries.map((newsEntry, index) => (
          <div className={styles.entryWrapper} key={index}>
            <h5>{newsEntry.date.toLocaleDateString()}</h5>
            <ul>
              {newsEntry.entries.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
