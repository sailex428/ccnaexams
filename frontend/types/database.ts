export type QuestionType = {
  number: string;
  question: LanguageStringType;
  options: LanguageArrayType;
  answer: LanguageArrayType;
  explanation: LanguageStringType;
  type: "checkbox" | "radio";
  img: string;
};

export type DetailType = {
  numberOfQuestions: number;
  title: LanguageStringType;
};

export type LanguageArrayType = {
  en: string[];
  de: string[];
};

export type LanguageStringType = {
  en: string;
  de: string;
};
