"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChainIds } from "@/utils/chains";
import { AppConstants } from "@/utils/app-constants";

export const useChainId = (defaultChain = ChainIds.MAINNET) => {
  const [chainId, setChainStateId] = useState(defaultChain);

  useEffect(() => {
    const value = window.localStorage.getItem(
      AppConstants.LOCAL_STORAGE_CHAIN_ID_KEY,
    );
    if (value !== null) {
      setChainStateId(Number(value));
    }
  }, []);

  const setChainId = (value: number) => {
    setChainStateId(value);
    window.localStorage.setItem(
      AppConstants.LOCAL_STORAGE_CHAIN_ID_KEY,
      String(value),
    );
  };

  return {
    chainId,
    setChainId,
  };
};
