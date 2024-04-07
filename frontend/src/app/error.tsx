"use client";

import Link from "next/link";
import styles from "../../styles/globals.module.css";

export default function Error() {
  return (
    <div className={styles.error}>
      <h2>An Error occurred</h2>
      <Link href="/">Return Home</Link>
    </div>
  );
}
