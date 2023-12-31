import { ChainIds } from "@/utils/chains";

export const NetworkMetadata = {
  [ChainIds.MAINNET]: {
    id: "0x1",
    chainId: ChainIds.MAINNET,
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://etherscan.io"],
    apiUrl: "https://api.etherscan.io/api",
    apikeyName: "ETHER_SCAN_API_KEY",
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
    id: "0x89",
    chainId: ChainIds.POLYGON,
    chainName: "Polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com"],
    apiUrl: "https://api.polygonscan.com/api",
    apikeyName: "POLYGON_SCAN_API_KEY",
  },
};
