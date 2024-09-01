import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  AnswersType,
  DetailType,
  QuestionType,
  ResultType,
} from "@/types/database";

//TODO: move uri to env file
const uri = "http://localhost:10051/api";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const postAnswersFetcher = async (
  url: string,
  { arg: userAnswers }: { arg: AnswersType[] },
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userAnswers),
  });

  if (!response.ok) {
    throw new Error("Failed to post answers");
  }

  return response.json();
};

export function useQuestion(moduleId: string, questionId: number) {
  const { data, isLoading, error } = useSWR<QuestionType[]>(
    `${uri}/question/${moduleId}/${questionId}`,
    fetcher,
  );

  return {
    question: data === undefined ? ({} as QuestionType) : data[0],
    isLoading: isLoading,
    isError: error,
  };
}

export function useDetail(moduleId: string) {
  const { data, isLoading, error } = useSWR<DetailType[]>(
    `${uri}/detail/${moduleId}`,
    fetcher,
  );
  return {
    detail: data === undefined ? ({} as DetailType) : data[0],
    isLoading: isLoading,
    isError: error,
  };
}

export function useAnswers(moduleId: string) {
  const { trigger, data, error, isMutating } = useSWRMutation<ResultType>(
    `${uri}/result/${moduleId}`,
    postAnswersFetcher,
  );

  return {
    postAnswers: trigger,
    data,
    error,
    isMutating,
  };
}
