import React from "react";
import ExamsNavbar from "@/src/components/examsNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { AnswerContextProvider } from "@/src/components/answerContext";

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
          <AnswerContextProvider>{children}</AnswerContextProvider>
        </ExamsNavbar>
      </body>
    </html>
  );
}
