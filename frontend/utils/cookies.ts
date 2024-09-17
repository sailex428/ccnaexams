import { getCookie, setCookie } from "cookies-next";

export const setQuestionOrderCookie = (order: number[]) => {
  setCookie("questionOrder", JSON.stringify(order), {
    expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
    sameSite: "strict",
  });
};

export const getQuestionOrderCookie = () => {
  return getCookie("questionOrder");
};
