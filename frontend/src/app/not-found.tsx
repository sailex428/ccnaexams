import Link from "next/link";

export default function NotFound() {
  return (
    <div className={"defaultBackground"}>
      <div className={"notfound"}>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
