import { Dispatch, type SetStateAction } from "react";

export type LanguageContextType = {
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
};
