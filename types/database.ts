export type Question = {
  number: number;
  question: string;
  options: Array<string>;
  answer: string;
  explanation: string;
};

export type QuestionModule = {
  _id: string;
} & Question;
