import { Lato } from "next/font/google";
import { HtmlHead } from "@/components/Html/HtmlHead";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Select } from "@/components/Select";
import { NetworkMetadata } from "@/utils/network-metadata";
import { useCallback } from "react";
import { useChainId } from "@/hooks/chainId";
import { useRouter } from "next/router";

const latoFonts = Lato({ weight: "400", subsets: ["latin"] });
export default function Home() {
  const router = useRouter();
  const { chainId, setChainId } = useChainId();

  const handleSearch = useCallback(
    async (e: Record<string, any>) => {
      await router.push(`/address/${e.address}`, undefined, { shallow: true });
    },
    [router],
  );

  return (
    <>
      <HtmlHead title="Search" />
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
                <div className="">Search by address</div>
                <div>
                  <Select
                    selectClassName="p-1"
                    onChange={(e) => setChainId(Number(e.target.value))}
                    defaultValue={chainId}
                    key={chainId}
                    options={Object.values(NetworkMetadata).map(
                      (data, ind) => ({
                        label: data.chainName,
                        value: data.chainId,
                      }),
                    )}
                  />
                </div>
              </div>
              <SearchBar
                defaultValue="0xe8bdcdc4c8c05245a68410351293cda30980ab49"
                onSubmit={async (e) => {
                  await handleSearch(e);
                }}
                chainId={chainId}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
