import styles from "@/styles/globals.module.css";

type Props = {
  img: string;
};

export default function ExamImage(img: Props) {
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
