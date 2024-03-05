import { Col } from "react-bootstrap";
import styles from "../../styles/homepage.module.css";
import { newsEntries } from "@/src/components/news";

export default function Homepage() {
  return (
    <div>
      <Col className="content px-0 mx-auto h-100">
        <div className={styles.newsWrapper}>
          <h2 className={styles.headline}>{"What's new:"}</h2>
          {newsEntries.map((newsEntry, index) => (
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
      </Col>
    </div>
  );
}
