import Link from "next/link";
import styles from "../../styles/globals.module.css";

export default function NotFound() {
  return (
    <div className={styles.notfound}>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
