import { useQuery, UseQueryOptions } from "react-query";
import { queryClient } from "@/utils/query-client";
import { ApiError } from "@/types/api-error";
import { Transaction } from "@/types/transcation";

const queryKey = "get-balance";
export const useGetBalance = (
  params: { address: string; chainId: string },
  options?: Pick<UseQueryOptions, "enabled">,
) =>
  useQuery<
    {
      status: string;
      message: string;
      result: string;
    },
    ApiError
  >(
    [queryKey, params],
    async () => {
      const response = await fetch(
        "/api/balance?" + new URLSearchParams(params),
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
