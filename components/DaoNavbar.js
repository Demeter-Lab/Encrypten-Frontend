import React, { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import MetaMaskIcon from "../assets/icon_metamask.png";
import Image from "next/image";
import { useWallet } from "@/context/WalletContext";
import Link from "next/link";
import Logo from "../assets/Encryten-logo.png";

const DaoNavbar = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { signer, setWalletSigner } = useWallet();

  const errorMessages = {
    wrongChain: "Not connected to Mode Testnet!",
    metamaskNotDetected: "Connect Metamask!",
  };

  async function connectWallet() {
    const provider = await detectEthereumProvider();

    if (provider) {
      try {
        const chainId = await provider.request({ method: "eth_chainId" });
        if (chainId !== "0x397") {
          // Chain ID doesn't match
          throw new Error(errorMessages.wrongChain);
        } else {
          setWalletSigner(
            new ethers.providers.Web3Provider(provider).getSigner()
          );
          await setIsConnected(true);
        }
      } catch (error) {
        // Handle the error, set the error message state
        setErrorMessage(error.message);
      }
    } else {
      // Metamask not detected
      setErrorMessage(errorMessages.metamaskNotDetected);
    }
  }

  return (
    <nav className="py-2 md:py-2">
      <div className="container mx-auto flex items-center justify-between border-b border-gray-300 py-2 pl-2">
        <div>
          <Link href="/">
            <Image src={Logo} alt="Encrypten Logo" className="w-16 h-5" />
          </Link>
        </div>

        {errorMessage && (
          <div className="error-message mb-2 md:mb-0 md:mr-4">
            {errorMessage}
          </div>
        )}

        <div className="mr-2">
          <button
            className={`text-gray-200 text-sm border border-gray-200 px-2 py-2 rounded-md ${
              isConnected
                ? "bg-white text-blue-500 border-none px-8 relative"
                : ""
            }`}
            onClick={connectWallet}
          >
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <Image
                src={MetaMaskIcon}
                alt="MetaMask Icon"
                className={`w-5 h-5 ${isConnected ? "" : "hidden"}`}
              />
            </span>
            {isConnected ? "Connected !" : "Connect Wallet"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DaoNavbar;
