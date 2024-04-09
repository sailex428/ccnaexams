import React from "react";
import ExamsNavbar from "@/src/components/examsNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { AnswerContextProvider } from "@/src/components/answerContext";
import { LanguageContextProvider } from "@/src/components/languageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>CCNAExams</title>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        <ExamsNavbar>
          <AnswerContextProvider>
            <LanguageContextProvider>{children}</LanguageContextProvider>
          </AnswerContextProvider>
        </ExamsNavbar>
      </body>
    </html>
  );
}
