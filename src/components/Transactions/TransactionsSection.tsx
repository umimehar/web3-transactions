import { Transaction } from "@/types/transcation";
import Link from "next/link";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { convertValueToEther, fixedToDecimals } from "@/utils/util-funcs";
import { NetworkMetadata } from "@/utils/network-metadata";
import format from "date-fns/format";
import { ClipboardCopy } from "@/components/ClipboardCopy";
import { Tooltip } from "react-tooltip";
import { useGetBalance } from "@/hooks/api/useGetBalance";
import { LineSkeleton } from "@/components/Skeleton/LinesSkeleton";

type TransactionsSectionProps = {
  transactionsData: {
    status: string;
    message: string;
    result: Transaction[];
  };
  chainId: number;
  address: string;
};
export const TransactionsSection = ({
  transactionsData,
  chainId,
  address,
}: TransactionsSectionProps) => {
  const { result: transactions } = transactionsData || {};
  const networkMetaData = NetworkMetadata[chainId];

  const { data: { result: balance } = {}, isLoading: balanceLoading } =
    useGetBalance({
      address,
      chainId: String(chainId),
    });

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="text-gray-900 dark:text-gray-200 text-3xl flex justify-between items-center">
        <div>Transactions</div>
        <div className="flex flex-col gap-0 items-end">
          <div className="text-sm text-gray-700 dark:text-gray-400">
            Balance
          </div>
          <LineSkeleton
            wrapperClassName="mt-1"
            loading={balanceLoading}
            rows={2}
          >
            <div>
              {balance && (
                <>
                  {Number(1) > 0
                    ? fixedToDecimals(convertValueToEther(balance))
                    : 0}{" "}
                  {networkMetaData.nativeCurrency.symbol}
                </>
              )}
            </div>
          </LineSkeleton>
        </div>
      </div>
      <div className={"flex flex-col gap-3"}>
        {transactions &&
          transactions.map((transaction, ind) => (
            <Link
              href={{
                pathname: `/tx/${transaction.hash}`,
              }}
              key={ind}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-800 hover:border-gray-600 dark:hover:border-gray-300 cursor-pointer"
            >
              <div
                className={"flex flex-col md:flex-row justify-between gap-2"}
              >
                <div className="md:w-1/6">
                  <div className="text-xs flex gap-1 items-center">
                    <div>Transaction Hash</div>

                    <div>
                      {transaction.txreceipt_status === "1" ? (
                        <div
                          data-tooltip-id="tooltip-for-status"
                          data-tooltip-content="Success"
                          className="bg-green-100 text-green-800 font-medium mr-2 px-1 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >
                          <CheckIcon className={"w-3"} />
                        </div>
                      ) : (
                        <div
                          data-tooltip-id="tooltip-for-status"
                          data-tooltip-content="Failed"
                          className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                        >
                          <XMarkIcon className={"w-3"} />
                        </div>
                      )}
                      <Tooltip id="tooltip-for-status" />
                    </div>
                  </div>
                  <div className="font-bold">
                    <div className="font-bold flex gap-1">
                      {transaction.hash.substring(0, 15)}...
                      <ClipboardCopy className="w-3" value={transaction.hash} />
                    </div>
                  </div>
                </div>

                <div className="md:w-1/6">
                  <div className="text-xs">Value</div>
                  <div className="font-bold text-gray-700 dark:text-gray-400">
                    {transaction.value ? (
                      <>
                        {Number(transaction.value) > 0
                          ? fixedToDecimals(
                              convertValueToEther(transaction.value),
                            )
                          : 0}{" "}
                        {networkMetaData.nativeCurrency.symbol}
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>

                <div className="md:w-1/6">
                  <div className="text-xs">Time</div>
                  <div className="font-bold">
                    {format(
                      Number(transaction.timeStamp) * 1000,
                      "yyyy-MM-dd H:mm:ss",
                    )}
                  </div>
                </div>

                <div className="md:w-1/6">
                  <div className="text-xs">From</div>
                  <div className="font-bold flex gap-1">
                    {transaction.from.substring(0, 15)}...
                    <ClipboardCopy className="w-3" value={transaction.from} />
                  </div>
                </div>

                <div className="md:w-1/6">
                  <div className="text-xs">To</div>
                  <div className="font-bold flex gap-1">
                    {transaction.to.substring(0, 15)}...
                    <ClipboardCopy className="w-3" value={transaction.to} />
                  </div>
                </div>

                <div className="md:w-1/6">
                  <div className="text-xs">Block Number</div>
                  <div className="font-bold flex gap-1">
                    {transaction.blockNumber}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
