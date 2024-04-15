"use server";

import { DetailType, QuestionType } from "@/types/database";
import { UserAnswersType } from "@/types/answerContextType";

if (!process.env.BACKEND_URI) {
  throw new Error("Invalid/Missing BACKEND_URI");
}

const uri = process.env.BACKEND_URI;

export async function getQuestion(moduleId: string, questionId: number) {
  const data: QuestionType[] = await fetch(`${uri}/${moduleId}/${questionId}`)
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      console.log("Error: Fetch failed " + moduleId + " / " + questionId);
    });
  return data[0];
}

export async function getDetail(moduleId: string) {
  const data: DetailType[] = await fetch(`${uri}/${moduleId}/detail`)
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      console.log("Error: Fetch failed of detail of module " + moduleId);
    });
  return data[0];
}

export async function postAnswers(
  moduleId: string,
  userAnswers: UserAnswersType[],
) {
  let answerObject = [];
  for (const userAnswer of userAnswers) {
    if (userAnswer != undefined) {
      answerObject.push(userAnswer);
    }
  }
  const data = await fetch(`${uri}/${moduleId}/result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answerObject),
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      console.log("Error: Fetch failed of result " + moduleId);
    });
  return data[0];
}
