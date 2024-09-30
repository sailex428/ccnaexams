import { getCookie, setCookie } from "cookies-next";
import { AnswersType } from "@/types/database";

export const setCookieQuestionOrder = (order?: number[]) => {
  setCookie("questionOrder", JSON.stringify(order ?? []), {
    expires: getDefaultExpirationDate(),
    sameSite: "strict",
  });
};

export const getCookieQuestionOrder = () => {
  return getCookie("questionOrder");
};

export const setCookieUserAnswers = (userAnswers?: AnswersType[]) => {
  setCookie("userAnswers", JSON.stringify(userAnswers ?? []), {
    expires: getDefaultExpirationDate(),
    sameSite: "strict",
  });
};

export const getCookieUserAnswers = () => {
  return getCookie("userAnswers");
};

export const setCookieCurrentQuestion = (currentQuestion: number) => {
  setCookie("currentQuestion", currentQuestion.toString(), {
    expires: getDefaultExpirationDate(),
    sameSite: "strict",
  });
};

export const getCookieCurrentQuestion = () => {
  return getCookie("currentQuestion");
};

export const setCookieExamIsFinished = (examIsFinished: boolean) => {
  setCookie("examIsFinished", examIsFinished, {
    expires: getDefaultExpirationDate(),
    sameSite: "strict",
  });
};

export const getCookieExamIsFinished = () => {
  return getCookie("examIsFinished");
};

const getDefaultExpirationDate = () => {
  return new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
};
