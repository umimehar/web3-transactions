import { Lato } from "next/font/google";
import { HtmlHead } from "@/components/Html/HtmlHead";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Select } from "@/components/Select";
import { NetworkMetadata } from "@/utils/network-metadata";
import { useCallback, useEffect } from "react";
import { useChainId } from "@/hooks/chainId";
import { useRouter } from "next/router";
import { isValidAddress } from "@/utils/is-valid-address";

const latoFonts = Lato({ weight: "400", subsets: ["latin"] });
export default function Address() {
  const router = useRouter();
  const { chainId, setChainId } = useChainId();

  useEffect(() => {
    // redirect to home page if invalid address
    const { address } = router.query;
    if (!(address && isValidAddress(address as string))) {
      router.push("/", undefined, { shallow: true }).then();
      return;
    }
  }, [router]);

  const handleSearch = useCallback(
    (e: Record<string, any>) => {
      console.log(e, chainId, "asdf");
    },
    [chainId],
  );

  return (
    <>
      <HtmlHead title="Search" />
      <main className={`flex flex-col min-h-screen ${latoFonts.className}`}>
        <Header />
        <div className={"flex w-full justify-center items-center mt--20px"}>
          <div className="flex w-full h-48 bg-gradient-to-r from-indigo-500 text-white md:pl-10">
            <div className="flex gap-2 flex-col justify-center md:w-2/3 w-full max-w-xl px-3 md:p-0">
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
                onSubmit={(e) => {
                  handleSearch(e);
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
