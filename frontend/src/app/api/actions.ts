import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  AnswersType,
  DetailType,
  ExamType,
  QuestionType,
  ResultType,
} from "@/types/database";

//TODO: move uri to env file
const uri = "http://localhost:10051/api";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export function useQuestions(examId: string, moduleId: string) {
  const { data, isLoading, error } = useSWR<QuestionType[]>(
    `${uri}/questions/${examId}/${moduleId}`,
    fetcher,
  );

  return {
    questions: data === undefined ? ([] as QuestionType[]) : data,
    isLoading: isLoading,
    isError: error,
  };
}

export function useDetail(examId: string, moduleId?: string) {
  const url = moduleId
    ? `${uri}/detail/${examId}/${moduleId}`
    : `${uri}/detail/${examId}`;

  const { data, isLoading, error } = useSWR<DetailType[]>(url, fetcher);

  return {
    details: data === undefined ? ([] as DetailType[]) : data,
    isLoading: isLoading,
    isError: error,
  };
}

export function useExams() {
  const { data, isLoading, error } = useSWR<ExamType[]>(
    `${uri}/exams`,
    fetcher,
  );

  return {
    exams: data === undefined ? ([] as ExamType[]) : data,
    isLoading: isLoading,
    isError: error,
  };
}

export function useResult(examId: string, moduleId: string) {
  const { trigger, data, error, isMutating } = useSWRMutation<
    ResultType,
    Error,
    string,
    AnswersType[]
  >(
    `${uri}/result/${examId}/${moduleId}`,
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
