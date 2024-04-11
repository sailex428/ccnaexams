import styles from "@/styles/globals.module.css";

export default function ExamImage(img: { img: string }) {
  return (
    <>
      {img.img ? (
        <img
          src={"data:image/png;base64," + img.img}
          alt={"question image"}
          className={styles.image}
        />
      ) : (
        <></>
      )}
    </>
  );
}
