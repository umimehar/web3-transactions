import { useQuery, UseQueryOptions } from "react-query";
import { queryClient } from "@/utils/query-client";
import { ApiError } from "@/types/api-error";
import { Transaction } from "@/types/transcation";

const queryKey = "get-transactions";
export const useGetTransactions = (
  params: { address: string; chainId: string; page: string; offset: string },
  options?: Pick<UseQueryOptions, "enabled">,
) =>
  useQuery<
    {
      data: {
        status: string;
        message: string;
        result: Transaction[];
        page: number;
        offset: number;
      };
    },
    ApiError
  >(
    [queryKey, params],
    async () => {
      const response = await fetch(
        "/api/transactions?" + new URLSearchParams(params),
      );
      const jsonResponse = await response.json();
      if (!response.ok) {
        const { message = "Some error happened." } = jsonResponse;
        throw new Error(message);
      }
      return jsonResponse;
    },
    { ...options },
  );
