"use server";

import clientPromise from "./mongodbConnect";
import { QuestionModule } from "@/types/database";

const databaseName = "ccnaexams";
const collectionName = "modulequestion";

async function getDB() {
  const client = await clientPromise;
  return client.db(databaseName);
}

export async function getModuleQuestions(moduleId: string) {
  try {
    const db = await getDB();
    return db
      .collection<QuestionModule>(collectionName)
      .find({ module: moduleId })
      .toArray();
  } catch (e) {
    console.log("database error: " + e);
    const emptyArray: QuestionModule[] = [];
    return emptyArray;
  }
}
