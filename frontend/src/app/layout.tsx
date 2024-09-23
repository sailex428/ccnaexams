import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import ExamsNavbar from "@/src/components/examsNavbar";
import { LanguageContextProvider } from "@/src/components/context/languageContext";
import { AnswerContextProvider } from "@/src/components/context/answerContext";
import ExamFooter from "@/src/components/examFooter";
import "dotenv/config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <head>
        <title>CCNAExams</title>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        <LanguageContextProvider>
          <ExamsNavbar />
          <AnswerContextProvider>{children}</AnswerContextProvider>
          <ExamFooter />
        </LanguageContextProvider>
      </body>
    </html>
  );
}
