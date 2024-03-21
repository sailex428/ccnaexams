export type QuestionType = {
  number: number;
  question: string;
  options: Array<string>;
  answer: string;
  explanation: string;
};

export type QuestionModuleType = {
  _id: string;
} & QuestionType;
