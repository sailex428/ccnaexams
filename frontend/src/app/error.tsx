"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className={"defaultBackground"}>
      <div className={"defaultPageLayout defaultText"}>
        <h2>An Error occurred</h2>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
