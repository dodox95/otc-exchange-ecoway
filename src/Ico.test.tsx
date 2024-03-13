// dapp-token-ico\src\ICOToken.tsx
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { formatUnits, parseUnits } from "@ethersproject/units";

import OTCMarketArtifacts from "./artifacts/contracts/OTC.sol/OTCMarket.json";
import ITManTokenArtifacts from "./artifacts/contracts/ITManToken.sol/ITManToken.json";
import logger from "./logger";
import { type ITManToken, type OTCMarket } from "./types";

const tokenAddress = "0xB4141B39C3f621c8f545d4d86cd3d7b1EcEe5016"; // ITManToken address
const otcMarketAddress = "0xDea5cA081F653A0bb8C2D7FA7b720C2Ef07B6224"; // OTCMarket address

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

const providerUrl = import.meta.env.VITE_PROVIDER_URL;

function TokenInfo() {
  const { library } = useWeb3React();

  const fetchTokenInfo = async () => {
    const provider = library || new ethers.providers.Web3Provider(window.ethereum || providerUrl);
    const tokenContract = new ethers.Contract(tokenAddress, ITManTokenArtifacts.abi, provider) as ITManToken;
    const name = await tokenContract.name();
    const symbol = await tokenContract.symbol();
    const decimals = await tokenContract.decimals();
    const totalSupply = await tokenContract.totalSupply();
    return {
      name,
      symbol,
      decimals,
      totalSupply,
    };
  };

  const { error, isLoading, data } = useQuery(["token-info", tokenAddress], fetchTokenInfo, {
    enabled: !!tokenAddress,
  });

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-col">
      <button type="button" className="btn">
        {data?.name}
        <div className="ml-2 badge">{data?.symbol}</div>
        <div className="ml-2 badge badge-info">{data?.decimals}</div>
      </button>
      <div className="shadow stats">
        <div className="stat">
          <div className="stat-title">Total Supply</div>
          <div className="stat-value">{formatUnits(data?.totalSupply ?? 0)}</div>
        </div>
      </div>
    </div>
  );
}

async function requestAccount() {
  if (window.ethereum?.request) {
    return window.ethereum.request({ method: "eth_requestAccounts" });
  }
  throw new Error("Missing install Metamask. Please access https://metamask.io/ to install extension on your browser");
}

function ICOToken() {
  const { library, account } = useWeb3React();
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleSellOrder = async () => {
    if (!library || !account) return;
    
    // Sprawdzenie, czy wartości są poprawne
    if (!amount || !price) {
      toast.error("Amount and price must be provided.");
      return;
    }

    try {
      await requestAccount();
      const signer = library.getSigner(account);
      const otcContract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, signer);

      // Przygotowanie wartości do transakcji
      let parsedPrice, parsedAmount;
      try {
        parsedPrice = parseUnits(price, "ether");
        parsedAmount = parseUnits(amount, "ether");
      } catch (error) {
        logger.error(error);
        toast.error("Invalid amount or price format.");
        return;
      }

      await approveTokensForOTC(parsedAmount); // Zatwierdzenie tokenów dla OTC
      const transaction = await otcContract.createSellOrder(parsedAmount, parsedPrice);

      await toast.promise(transaction.wait(), {
        loading: "Submitting sell order...",
        success: "Sell order successfully created!",
        error: "Failed to create sell order.",
      });
    } catch (error) {
      logger.error(error);
      toast.error("An error occurred during the sell order creation.");
    }
  };

  async function approveTokensForOTC(amount) {
    const tokenContract = new ethers.Contract(tokenAddress, ITManTokenArtifacts.abi, library.getSigner());
    const approvalTransaction = await tokenContract.approve(otcMarketAddress, amount);
    await toast.promise(approvalTransaction.wait(), {
      loading: "Approving tokens for trading...",
      success: "Tokens successfully approved!",
      error: "Token approval failed",
    });
  }

  return (
    <div className="ICOToken">
      <TokenInfo />
      <div>
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleSellOrder}>Create Sell Order</button>

      </div>
    </div>
  );
}

export default ICOToken;
