import styles from "@/styles/components/results.module.css";

type Props = {
  rightAnswers: number;
  length: number;
};

export default function Results({ rightAnswers, length }: Props) {
  const percentageOfRightAnswers =
    ((rightAnswers / length) * 100).toFixed(1) + "%";

  return (
    <div className={styles.container}>
      <h5 className="fw-bold">Result:</h5>
      <p>{percentageOfRightAnswers} of your answers are right.</p>
    </div>
  );
}