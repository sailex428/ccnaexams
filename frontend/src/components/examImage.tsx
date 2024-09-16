import Image from "next/image";
import styles from "@/styles/components/examImage.module.scss";

const ExamImage = (question: { img: string }) => {
  const questionImageSrc = "data:image/png;base64," + question.img;
  return (
    <div className={styles.imageWrapper}>
      {question.img ? (
        <Image
          src={questionImageSrc}
          alt={"question image"}
          className={styles.image}
          fill={true}
          onError={(e) => {
            e.currentTarget.src = "/images/fallback.png";
          }}
          blurDataURL={questionImageSrc}
          placeholder={"blur"}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ExamImage;
