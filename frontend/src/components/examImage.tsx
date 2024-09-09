import Image from "next/image";
import clsx from "clsx";

export default function ExamImage(question: { img: string }) {
  return (
    <>
      {question.img ? (
        <Image
          src={"data:image/png;base64," + question.img}
          alt={"question image"}
          className={clsx("image")}
        />
      ) : (
        <></>
      )}
    </>
  );
}
