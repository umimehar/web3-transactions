import { Web3 } from "web3";
export const isValidHash = (addr: string) => {
  return /^0x([A-Fa-f0-9]{64})$/.test(addr);
};

export const isValidAddress = (adr: string) => {
  try {
    Web3.utils.toChecksumAddress(adr);
    return true;
  } catch (e) {
    return false;
  }
};

export const convertValueToEther = (value: string) => {
  return Web3.utils.fromWei(value, "ether");
};

export const fixedToDecimals = (value: string, decimals: number = 8) => {
  return parseFloat(parseFloat(value).toFixed(decimals));
};
