import { Lato } from "next/font/google";
import { HtmlHead } from "@/components/Html/HtmlHead";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Select } from "@/components/Select";
import { NetworkMetadata } from "@/utils/network-metadata";
import { useCallback, useEffect } from "react";
import { useChainId } from "@/hooks/chainId";
import { useRouter } from "next/router";
import { isValidAddress } from "@/utils/util-funcs";
import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";
import { TransactionsSection } from "@/components/Transactions/TransactionsSection";
import { useGetTransactions } from "@/hooks/api/useGetTransactions";
import Link from "next/link";

const latoFonts = Lato({ weight: "400", subsets: ["latin"] });
export default function Address() {
  const router = useRouter();
  const { chainId, setChainId } = useChainId();
  const {
    address,
    page = "1",
    offset = "10",
  } = router.query as {
    address: string;
    page: string;
    offset: string;
  };

  const {
    isLoading,
    data: transactionsData,
    error,
    refetch,
  } = useGetTransactions(
    { address, chainId: String(chainId), page, offset },
    { enabled: !!chainId && !!address },
  );

  useEffect(() => {
    // redirect to home page if invalid address
    if (address && !isValidAddress(address)) {
      router.push("/");
      return;
    }
  }, [address, router]);

  useEffect(() => {
    if (!address) {
      return;
    }
    // only fetch is there is address
    refetch().then();
  }, [address, refetch, router]);

  const handleSearch = useCallback(
    async (e: Record<string, any>) => {
      await router.push(`/address/${e.address}`);
    },
    [address, chainId],
  );

  return (
    <>
      <HtmlHead title="Transactions" />
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
                defaultValue={address}
                onSubmit={async (e) => {
                  await handleSearch(e);
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full px-2 md:px-4 my-4">
          <TableSkeleton loading={isLoading}>
            {transactionsData && (
              <TransactionsSection
                transactionsData={transactionsData.data}
                chainId={chainId}
                address={address}
              />
            )}
            <div className={"my-3"}>
              <div className="flex justify-center items-center">
                {Number(page) != 1 && (
                  <Link
                    href={{
                      pathname: `./${address}`,
                      query: { offset, page: Number(page) - 1 },
                    }}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </Link>
                )}

                {transactionsData?.data &&
                  transactionsData?.data.result.length >= Number(offset) && (
                    <Link
                      href={{
                        pathname: `./${address}`,
                        query: { offset, page: Number(page) + 1 },
                      }}
                      className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
                    </Link>
                  )}
              </div>
            </div>
          </TableSkeleton>
        </div>
      </main>
    </>
  );
}
