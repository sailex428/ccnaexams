import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import ExamsNavbar from "@/src/components/examsNavbar";
import { LanguageContextProvider } from "@/src/components/context/languageContext";
import ExamFooter from "@/src/components/examFooter";

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
          {children}
          <ExamFooter />
        </LanguageContextProvider>
      </body>
    </html>
  );
}
