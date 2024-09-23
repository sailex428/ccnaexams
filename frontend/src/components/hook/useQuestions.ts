import { QuestionType } from "@/types/database";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function useQuestions(examId: string, moduleId: string) {
  const { data, isLoading, error } = useSWR<QuestionType[]>(
    `api/questions/${examId}/${moduleId}`,
    fetcher,
  );

  return {
    questions: data === undefined ? ([] as QuestionType[]) : data,
    isLoading: isLoading,
    isError: error,
  };
}
