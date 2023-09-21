import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "@/types/api-error";
import { isValidAddress } from "@/utils/util-funcs";
import { NetworkMetadata } from "@/utils/network-metadata";

interface GetBalanceReqType extends NextApiRequest {
  query: {
    address: string;
    chainId: string;
  };
}
const getBalance = async (
  req: GetBalanceReqType,
  res: NextApiResponse<
    | {
        data?: {
          status: string;
          message: string;
          result: number;
        };
      }
    | ApiError
  >,
) => {
  try {
    const { address, chainId } = req.query;
    if (!(address && chainId && isValidAddress(address))) {
      return res
        .status(500)
        .json({ message: "Address or chainId is not valid." });
    }
    // call apis based on params
    const { apiUrl, apikeyName } = NetworkMetadata[Number(chainId)];
    const initialQueryString = `module=account&action=balance&address=${address}&tag=latest&apikey=${process.env[apikeyName]}`;

    const response = await fetch(`${apiUrl}?${initialQueryString}`);
    if (!response.ok) {
      return res.status(500).json({ message: "failed to call api" });
    }
    const data = await response.json();

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ message: "An error occurred." });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  req.method === "POST"
    ? res.status(404).send("Post request not supported")
    : req.method === "PUT"
    ? res.status(404).send("Put request not supported")
    : req.method === "DELETE"
    ? res.status(404).send("Delete request not supported")
    : req.method === "GET"
    ? await getBalance(req as GetBalanceReqType, res)
    : res.status(404).send("Not found");
}
