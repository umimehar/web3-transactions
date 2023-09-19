import { Html, Head, Main, NextScript } from 'next/document'
import {Body} from "@/components/html/body";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Body>
        <Main />
        <NextScript />
      </Body>
    </Html>
  )
}
