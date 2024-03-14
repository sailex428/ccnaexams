"use server";

import clientPromise from "./mongodbConnect";
import { QuestionType, QuestionModuleType } from "@/types/database";

const databaseName = "ccnaexams";
const collectionName = "modulequestion";

async function getDB() {
  const client = await clientPromise;
  return client.db(databaseName);
}

export async function getQuestionsOfModule(moduleId: string) {
  try {
    const db = await getDB();
    return db
      .collection<QuestionModuleType>(collectionName)
      .find({ module: moduleId })
      .toArray();
  } catch (e) {
    console.log("database error: " + e);
    return [] as QuestionModuleType[];
  }
}

export async function getQuestion(questionId: number, moduleId: string) {
  try {
    const db = await getDB();
    return db
      .collection<QuestionType>(collectionName)
      .find({ module: moduleId, number: questionId })
      .toArray();
  } catch (e) {
    console.log("database error: " + e);
    return [] as QuestionType[];
  }
}
