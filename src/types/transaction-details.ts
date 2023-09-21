export type TransactionDetails = {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  type: string;
  accessList: any[]; // You can specify a more specific type for accessList if needed
  chainId: string;
  v: string;
  r: string;
  s: string;
  status: string;
};
