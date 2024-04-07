import styles from "@/styles/globals.module.css";

export default function ExamImage(image: { image: string }) {
  return (
    <>
      {image.image ? (
        <img
          src={"data:image/png;base64," + image.image}
          alt={"question image"}
          className={styles.image}
        />
      ) : (
        <></>
      )}
    </>
  );
}
