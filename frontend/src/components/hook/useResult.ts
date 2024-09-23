import useSWRMutation from "swr/mutation";
import { AnswersType, ResultType } from "@/types/database";

export function useResult(examId: string, moduleId: string) {
  const { trigger, data, error, isMutating } = useSWRMutation<
    ResultType,
    Error,
    string,
    AnswersType[]
  >(
    `api/result/${examId}/${moduleId}`,
    async (url, { arg }: { arg: AnswersType[] }) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
      if (!response.ok) {
        throw new Error("Failed to post answers");
      }
      return response.json();
    },
  );

  return {
    postAnswers: (answers: AnswersType[]) => trigger(answers),
    result: data === undefined ? ({} as ResultType) : data,
    isError: error,
    isMutating,
  };
}
