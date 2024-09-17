export type QuestionType = {
  number: string;
  question: LanguageStringType;
  options: OptionType[];
  explanation: LanguageStringType;
  img: string;
};

export type OptionType = {
  id: string;
} & LanguageArrayType;

export type ExamType = {
  exam: string;
  title: string;
};

export type DetailType = {
  numberOfQuestions: number;
  title: LanguageStringType;
  module: string;
};

export type LanguageArrayType = {
  en: string[];
  de: string[];
};

export type LanguageStringType = {
  en: string;
  de: string;
};

export type AnswersType = {
  number: string;
  answer: string[];
};

export type ResultType = {
  answers: AnswersType[];
  rightAnswersCount: number;
};
