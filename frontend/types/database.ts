export type QuestionType = {
  number: string;
  question: string;
  options: Array<string>;
  answer: string[];
  explanation: string;
  type: FormCheckInputType;
  image: string;
};

type FormCheckInputType = "checkbox" | "radio";

export type DetailType = {
  numberOfQuestions: number;
  title: string;
};
