import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AnswerContextProvider } from "@/src/components/answerContext";
import { LanguageContextProvider } from "@/src/components/languageContext";

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
          <AnswerContextProvider>{children}</AnswerContextProvider>
        </LanguageContextProvider>
      </body>
    </html>
  );
}
