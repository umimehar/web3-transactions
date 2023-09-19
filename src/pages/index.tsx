import { Lato } from "next/font/google";
import { HtmlHead } from "@/components/Html/HtmlHead";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Select } from "@/components/Select";
import { NetworkMetadata } from "@/utils/network-metadata";

const latoFonts = Lato({ weight: "400", subsets: ["latin"] });
export default function Home() {
  return (
    <>
      <HtmlHead title="Transactions" />
      <main className={`flex flex-col min-h-screen ${latoFonts.className}`}>
        <Header />
        <div
          className={"mt-40 flex w-full justify-center items-center mt--20px"}
        >
          <div className="flex w-full h-72 bg-gradient-to-r from-indigo-500 text-white">
            <div className="flex gap-2 flex-col justify-center items-center md:w-2/3 w-full max-w-xl px-3 md:p-0 mx-auto">
              <div
                className={
                  "flex justify-between items-center text-2xl font-bold w-full text-gray-900 dark:text-white"
                }
              >
                <div className="">Search Transactions</div>
                <div>
                  <Select
                    selectClassName="p-1"
                    options={Object.values(NetworkMetadata).map((data) => ({
                      label: data.chainName,
                      value: data.chainId,
                    }))}
                  />
                </div>
              </div>
              <SearchBar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
