import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "@/types/api-error";
import { isValidAddress, isValidHash } from "@/utils/util-funcs";
import { NetworkMetadata } from "@/utils/network-metadata";

interface GetTransactionDetailsReqType extends NextApiRequest {
  query: {
    transaction_hash: string;
    chainId: string;
  };
}
const getTransactionDetails = async (
  req: GetTransactionDetailsReqType,
  res: NextApiResponse<{ data?: any } | ApiError>,
) => {
  try {
    const { chainId, transaction_hash } = req.query;
    if (!(transaction_hash && chainId && isValidHash(transaction_hash))) {
      return res
        .status(500)
        .json({ message: "Tx Hash or chainId is not valid." });
    }
    // call apis based on params
    const { apiUrl, apikeyName } = NetworkMetadata[Number(chainId)];
    const initialQueryString = `module=proxy&action=eth_getTransactionByHash&txhash=${transaction_hash}&apikey=${process.env[apikeyName]}`;
    const txReceiptStatusString = `module=transaction&action=gettxreceiptstatus&txhash=${transaction_hash}&apikey=${process.env[apikeyName]}`;

    const response = await fetch(`${apiUrl}?${initialQueryString}`);
    // not calling parallel bcx of limit
    const data = await response.json();

    if (!data.result) {
      return res.status(500).json({ message: "No transaction found." });
    }
    const txReceiptStatusResp = await fetch(
      `${apiUrl}?${txReceiptStatusString}`,
    );
    if (!response.ok) {
      return res.status(500).json({ message: "failed to call api" });
    }
    const {
      result: { status },
    } = await txReceiptStatusResp.json();

    return res
      .status(200)
      .json({ data: { ...data, result: { ...data.result, status } } });
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
    ? await getTransactionDetails(req as GetTransactionDetailsReqType, res)
    : res.status(404).send("Not found");
}
