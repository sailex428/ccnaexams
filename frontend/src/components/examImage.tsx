import styles from "@/styles/globals.module.css";
import Image from "next/image";

export default function ExamImage(question: { img: string }) {
  return (
    <>
      {question.img ? (
        <Image
          src={"data:image/png;base64," + question.img}
          alt={"question image"}
          className={styles.image}
        />
      ) : (
        <></>
      )}
    </>
  );
}
