"use client";

import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { LanguageContextType } from "@/types/languageContextType";

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => null,
});

export function LanguageContextProvider(props: PropsWithChildren) {
  const [lang, setLang] = useState<"de" | "en">("en");

  const languageContext: LanguageContextType = {
    lang,
    setLang,
  };

  return (
    <LanguageContext.Provider value={languageContext}>
      {props.children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
