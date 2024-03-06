import React from "react";
import NavbarExams from "@/src/components/navbarExams";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>CCNAExams</title>
        <link rel="icon" href="/public/logo.png" />
      </head>
      <body>
        <NavbarExams />
        {children}
      </body>
    </html>
  );
}
