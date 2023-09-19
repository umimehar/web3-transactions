import { ChainIds } from "@/utils/chains";

export const NetworkMetadata = {
  [ChainIds.MAINNET]: {
    chainId: "0x1",
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://etherscan.io"],
  },
  // [ChainIds.GOERLI]: {
  //   chainId: "0x5",
  //   chainName: "Goerli",
  //   nativeCurrency: {
  //     name: "Ethereum",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   blockExplorerUrls: ["https://goerli.etherscan.io"],
  // },
  [ChainIds.POLYGON]: {
    chainId: "0x89",
    chainName: "Polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com"],
  },
};
