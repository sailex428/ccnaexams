import { Dispatch, type SetStateAction } from "react";

export type LanguageContextType = {
  lang: "de" | "en";
  setLang: Dispatch<SetStateAction<"de" | "en">>;
};
