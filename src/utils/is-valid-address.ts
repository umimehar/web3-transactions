import { Web3 } from "web3";

export const isValidAddress = (adr: string) => {
  try {
    Web3.utils.toChecksumAddress(adr);
    return true;
  } catch (e) {
    return false;
  }
};
