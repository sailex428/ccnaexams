import styles from "@/styles/pages/homepage.module.css";
import { news } from "@/src/components/lib/news";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.headline}>{"What's new: "}</h2>
        {news.newsEntries.map((newsEntry, index) => (
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
