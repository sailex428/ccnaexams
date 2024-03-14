import React from "react";
import NavbarExams from "@/src/components/navbarExams";
import "bootstrap/dist/css/bootstrap.min.css";
import { AnswerContextProvider } from "@/src/components/answerContext";
import { ModuleContextProvider } from "@/src/components/moduleContext";

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
        <NavbarExams>
          <ModuleContextProvider>
            <AnswerContextProvider>{children}</AnswerContextProvider>
          </ModuleContextProvider>
        </NavbarExams>
      </body>
    </html>
  );
}
