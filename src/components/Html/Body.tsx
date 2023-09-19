import React from "react";

export function Body({ lang, dir, children }: any): any {
  const defaultDir = lang === "fr" ? "rtl" : "ltr";
  return (
    <body className={`${defaultDir} dark:bg-gray-900`} dir={dir ?? defaultDir}>
      {children}
    </body>
  );
}
