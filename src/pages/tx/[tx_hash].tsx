import { Lato } from "next/font/google";
import { HtmlHead } from "@/components/Html/HtmlHead";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Select } from "@/components/Select";
import { NetworkMetadata } from "@/utils/network-metadata";
import { useCallback, useEffect } from "react";
import { useChainId } from "@/hooks/chainId";
import { useRouter } from "next/router";
import {
  convertValueToEther,
  fixedToDecimals,
  isValidAddress,
  isValidHash,
} from "@/utils/util-funcs";
import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";
import { TransactionsSection } from "@/components/Transactions/TransactionsSection";
import { useGetTransactions } from "@/hooks/api/useGetTransactions";
import Link from "next/link";
import { useGetTransactionDetails } from "@/hooks/api/useGetTransactionDetails";
import { ClipboardCopy } from "@/components/ClipboardCopy";
import { LineSkeleton } from "@/components/Skeleton/LinesSkeleton";
import format from "date-fns/format";
import { Web3 } from "web3";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";

const latoFonts = Lato({ weight: "400", subsets: ["latin"] });
export default function Transaction() {
  const router = useRouter();
  const { chainId, setChainId } = useChainId();
  const { tx_hash } = router.query as {
    tx_hash: string;
  };

  const {
    isLoading,
    data: transactionDetailResp,
    error,
    refetch,
  } = useGetTransactionDetails(
    { txHash: tx_hash, chainId: String(chainId) },
    { enabled: !!chainId && !!tx_hash },
  );

  const { result: data } = transactionDetailResp || {};
  const networkMetaData = NetworkMetadata[chainId];

  useEffect(() => {
    // redirect to home page if invalid address
    if (tx_hash && !isValidHash(tx_hash)) {
      router.push("/");
      return;
    }
  }, [tx_hash, router]);

  useEffect(() => {
    if (!tx_hash) {
      return;
    }
    // only fetch is there is address
    refetch().then();
  }, [tx_hash, router, refetch]);

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
                  "flex justify-between items-center text-3xl font-bold w-full text-gray-900 dark:text-white"
                }
              >
                <div className="">Transaction Details</div>
              </div>
            </div>
          </div>
        </div>

        <LineSkeleton
          rows={5}
          loading={isLoading}
          lineClassName="w-full h-5 my-3"
          wrapperClassName="mt-4 mx-4"
        >
          {data && (
            <div className="mx-3 my-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 text-gray-800 dark:text-gray-300">
                  Transaction Hash
                </div>
                <div className="flex gap-2 w-full md:w-4/6 ">
                  <div className="break-all">{data.hash}</div>
                  <ClipboardCopy className="w-10 md:w-3" value={data.hash} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 text-gray-800 dark:text-gray-300">
                  Status
                </div>
                <div className="flex gap-2 w-full md:w-4/6 ">
                  <div className="break-all">
                    <div>
                      {data.status === "1" ? (
                        <div
                          data-tooltip-id="tooltip-for-status"
                          data-tooltip-content="Success"
                          className="flex gap-2 text-xs justify-center bg-green-100 text-green-800 font-medium mr-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >
                          <CheckIcon className={"w-3"} />
                          Success
                        </div>
                      ) : (
                        <div
                          data-tooltip-id="tooltip-for-status"
                          data-tooltip-content="Failed"
                          className="flex gap-2 justify-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                        >
                          <XMarkIcon className={"w-3"} />
                          Failed
                        </div>
                      )}
                      <Tooltip id="tooltip-for-status" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 text-gray-800 dark:text-gray-300">
                  Block
                </div>
                <div className="flex gap-2 w-full md:w-4/6 ">
                  <div className="break-all">
                    {Web3.utils.toDecimal(data.blockNumber).toString()}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 text-gray-800 dark:text-gray-300">
                  Value
                </div>
                <div className="flex gap-2 w-full md:w-4/6 ">
                  <div className="break-all">
                    {Number(Web3.utils.toDecimal(data.value)) /
                      Math.pow(10, 18)}{" "}
                    {networkMetaData.nativeCurrency.symbol}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 text-gray-800 dark:text-gray-300">
                  Fee
                </div>
                <div className="flex gap-2 w-full md:w-4/6 ">
                  {data.status && (
                    <div className="break-all">
                      {(Number(Web3.utils.toDecimal(data.gasPrice)) *
                        Number(Web3.utils.toDecimal(data.gas))) /
                        Math.pow(10, 18)}{" "}
                      {networkMetaData.nativeCurrency.symbol}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 text-gray-800 dark:text-gray-300">
                  Gas price
                </div>
                <div className="flex gap-2 w-full md:w-4/6 ">
                  <div className="break-all">
                    {Number(Web3.utils.toDecimal(data.gasPrice)) /
                      Math.pow(10, 9)}{" "}
                    {"Gwei"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 text-gray-800 dark:text-gray-300">
                  block
                </div>
                <div className="flex gap-2 w-full md:w-4/6 ">
                  <div className="break-all">
                    {Number(Web3.utils.toDecimal(data.blockNumber))}
                  </div>
                </div>
              </div>

              <div className="my-1 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 text-gray-800 dark:text-gray-300">
                  To
                </div>
                <div className="flex gap-2 w-full md:w-4/6 ">
                  <div className="break-all">{data.to}</div>
                  <ClipboardCopy className="w-6 md:w-3" value={data.to} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 text-gray-800 dark:text-gray-300">
                  From
                </div>
                <div className="flex gap-2 w-full md:w-4/6 ">
                  <div className="break-all">{data.from}</div>
                  <ClipboardCopy className="w-6 md:w-3" value={data.from} />
                </div>
              </div>
            </div>
          )}
        </LineSkeleton>
        {error && (
          <div className="text-2xl p-10 flex items-center justify-center">
            {error.message}
          </div>
        )}
      </main>
    </>
  );
}
