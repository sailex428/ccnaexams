import { Question } from "@/types/database";

export default function Question({
  number,
  question,
  options,
  answer,
  explanation,
}: Question) {
  return (
    <div>
      <p>{question}</p>
      <p>{number}</p>
      <p>{explanation}</p>
      <p>{answer}</p>
      <p>{options}</p>
    </div>
  );
}
