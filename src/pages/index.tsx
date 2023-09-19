import { Inter } from 'next/font/google'
import {HtmlHead} from "@/components/html/html-head";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <HtmlHead title="Transactions" />
      <main>
        Main
      </main>
    </>
  )
}
