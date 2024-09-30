import useSWR from "swr";
import { ExamType } from "@/types/database";
import { fetcher } from "@/utils/fetcher";

export function useExams() {
  const { data, isLoading, error } = useSWR<ExamType[]>(`api/exams`, fetcher);

  return {
    exams: data === undefined ? ([] as ExamType[]) : data,
    isLoading: isLoading,
    isError: error,
  };
}
