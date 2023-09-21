import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/utils/query-client";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-tooltip/dist/react-tooltip.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" enableSystem={true}>
        <Component {...pageProps} />
      </ThemeProvider>

      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </QueryClientProvider>
  );
}
