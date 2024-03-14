"use client";

import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { ModuleContextType } from "@/types/moduleContextType";

const ModuleContext = createContext<ModuleContextType>({
  module: "",
  setModule: () => null,
});

export function ModuleContextProvider(props: PropsWithChildren) {
  const [module, setModule] = useState<string>("");

  const moduleContext: ModuleContextType = {
    module: module,
    setModule: setModule,
  };

  return (
    <ModuleContext.Provider value={moduleContext}>
      {props.children}
    </ModuleContext.Provider>
  );
}

export default ModuleContext;
