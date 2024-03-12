"use client";

import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [signer, setSigner] = useState(null);

  const setWalletSigner = (newSigner) => {
    setSigner(newSigner);
  };

  return (
    <WalletContext.Provider value={{ signer, setWalletSigner }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
