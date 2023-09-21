import { useQuery, UseQueryOptions } from "react-query";
import { queryClient } from "@/utils/query-client";
import { ApiError } from "@/types/api-error";
import { Transaction } from "@/types/transcation";
import { TransactionDetails } from "@/types/transaction-details";

const queryKey = "get-transaction-details";
export const useGetTransactionDetails = (
  params: { txHash: string; chainId: string },
  options?: Pick<UseQueryOptions, "enabled">,
) =>
  useQuery<
    {
      status: string;
      message: string;
      result: TransactionDetails;
    },
    ApiError
  >(
    [queryKey, params],
    async () => {
      const { txHash, ...rest } = params;
      const response = await fetch(
        `/api/transactions/${params.txHash}?` + new URLSearchParams(rest),
      );
      const jsonResponse = await response.json();
      if (!response.ok) {
        const { message = "Some error happened." } = jsonResponse;
        throw new Error(message);
      }
      return jsonResponse.data;
    },
    { ...options },
  );
