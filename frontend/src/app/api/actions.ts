"use server";

import {
  AnswersType,
  DetailType,
  QuestionType,
  ResultType,
} from "@/types/database";

if (!process.env.BACKEND_URI) {
  throw new Error("Invalid/Missing BACKEND_URI");
}

const uri = process.env.BACKEND_URI;

export async function getQuestion(moduleId: string, questionId: number) {
  const data: QuestionType[] = await fetch(
    `${uri}/question/${moduleId}/${questionId}`,
  )
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      console.log("Error: Fetch failed " + moduleId + " / " + questionId);
    });
  if (data === undefined) {
    return {} as QuestionType;
  }
  return data[0];
}

export async function getDetail(moduleId: string) {
  const data: DetailType[] = await fetch(`${uri}/detail/${moduleId}`)
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      console.log("Error: Fetch failed of detail of module " + moduleId);
    });
  if (data === undefined) {
    return {} as DetailType;
  }
  return data[0];
}

export async function postAnswers(
  moduleId: string,
  userAnswers: AnswersType[],
) {
  const data: ResultType = await fetch(`${uri}/result/${moduleId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userAnswers),
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      console.log("Error: Fetch failed of result " + moduleId);
    });
  if (data === undefined) {
    return {} as ResultType;
  }
  return data;
}
