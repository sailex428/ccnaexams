import type { Dispatch, SetStateAction } from "react";

export type ModuleContextType = {
  module: string;
  setModule: Dispatch<SetStateAction<string>>;
};
