import React from 'react';

export function Body({ lang, dir, children }: any): any {
  const defaultDir = lang === 'ar' ? 'rtl' : 'ltr';
  return (
    <body className={defaultDir} dir={dir ?? defaultDir}>
      {children}
    </body>
  );
}
