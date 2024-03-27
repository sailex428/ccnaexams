"use server";

import clientPromise from "./mongodbConnect";
import { QuestionType } from "@/types/database";

const databaseName = "ccnaexams";
const collectionName = "modulequestionproduktion";

async function getDB() {
  const client = await clientPromise;
  return client.db(databaseName);
}

export async function getQuestionsOfModule(moduleId: string) {
  try {
    const db = await getDB();

    const questionData =  await db
      .collection<QuestionType>(collectionName)
      .find({ module: moduleId })
      .toArray();

    return sortQuestions(questionData.map((questionData) => {
      const { _id, ...question } = questionData;
      return {...question} as QuestionType;
    }));

  } catch (e) {
    console.log("database error: " + e);
    return [] as QuestionType[];
  }
}

async function sortQuestions(questions: QuestionType[]) {
  questions.map(q => {q.options.sort(() => 0.5 - Math.random())})
  questions.sort(() => 0.5 - Math.random())
  return questions;
}

export async function getQuestion(questionId: number, moduleId: string) {
  try {
    const db = await getDB();
    const data = await db
      .collection<QuestionType>(collectionName)
      .find({ module: moduleId, number: questionId })
      .toArray();

    return data.map((questionData) => {
      const { _id, ...question } = questionData;
      return {...question} as QuestionType;
    });
  } catch (e) {
    console.log("database error: " + e);
  }
  return [] as QuestionType[];
}
