import clsx from "clsx";
import Image from "next/image";

const ExamImage = (question: { img: string }) => {
  return (
    <>
      {question.img ? (
        <Image
          src={"data:image/png;base64," + question.img}
          alt={"question image"}
          className={clsx("image")}
          fill={true}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ExamImage;
