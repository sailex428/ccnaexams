import { getCookie, setCookie } from "cookies-next";
import { AnswersType } from "@/types/database";

export const setCookieQuestionOrder = (order: number[]) => {
  setCookie("questionOrder", JSON.stringify(order), {
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

const getDefaultExpirationDate = () => {
  return new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
};
