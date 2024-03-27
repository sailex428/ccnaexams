export type QuestionType = {
  number: number;
  question: string;
  options: Array<string>;
  answer: string[];
  explanation: string;
  type: FormCheckInputType;
  img: string;
};

type FormCheckInputType = "checkbox" | "radio";
