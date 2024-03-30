"use server";

import { QuestionType } from "@/types/database";

if (!process.env.BACKEND_URI) {
  throw new Error("Invalid/Missing BACKEND_URI");
}

const uri = process.env.BACKEND_URI;
export async function getQuestions(moduleId: string) {
  const data = await fetch(`${uri}/${moduleId}`, {
    cache: "force-cache",
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      console.log("Error: Fetch failed " + moduleId);
    });
  return data as QuestionType[];
}

export async function getQuestion(moduleId: string, questionId: number) {
  const data = await fetch(`${uri}/${moduleId}/${questionId}`, {
    cache: "force-cache",
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      console.log("Error: Fetch failed " + moduleId + " / " + questionId);
    });
  return data as QuestionType[];
}
