import useSWR from "swr";
import { DetailType } from "@/types/database";
import { fetcher } from "@/utils/fetcher";

export function useDetail(examId: string, moduleId?: string) {
  const url = moduleId
    ? `api/detail/${examId}/${moduleId}`
    : `api/detail/${examId}`;

  const { data, isLoading, error } = useSWR<DetailType[]>(url, fetcher);

  return {
    details: data === undefined ? ([] as DetailType[]) : data,
    isLoading: isLoading,
    isError: error,
  };
}
