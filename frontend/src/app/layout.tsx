import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AnswerContextProvider } from "@/src/components/answerContext";
import { LanguageContextProvider } from "@/src/components/languageContext";
import ExamsNavbar from "@/src/components/examsNavbar";

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
        </LanguageContextProvider>
      </body>
    </html>
  );
}
