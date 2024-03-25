import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import OTCMarketArtifacts from "../src/artifacts/contracts/OTC.sol/OTCMarket.json";
import ITManTokenArtifacts from "../src/artifacts/contracts/ITManToken.sol/ITManToken.json";

const tokenAddress = "0x7712Da3dA92c3125fDA5Cbc8f6Ac03743f9b08c8";
const otcMarketAddress = "0xD7ED4ec8675d8f9b7089164BE80b092747Af7817";

function OTCMarketComponent() {
  const { account, library } = useWeb3React();
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [tokenListings, setTokenListings] = useState([]);
  const [ethListings, setEthListings] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwnerStatus = async () => {
      if (library) {
        const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner());
        const owner = await contract.owner();
        setIsOwner(owner.toLowerCase() === account?.toLowerCase());
        fetchListings();
      }
    };

    checkOwnerStatus();
  }, [library, account]);

  const fetchListings = async () => {
    const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner());
    try {
      const tokenListings = await contract.getActiveTokenListings();
      const ethListings = await contract.getActiveEthListings();
      setTokenListings(tokenListings);
      setEthListings(ethListings);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      toast.error("Could not fetch listings.");
    }
  };

  const listTokenForSale = async () => {
    if (!amount || !price) {
      toast.error("Please enter both amount and price.");
      return;
    }
  
    const tokenContract = new ethers.Contract(tokenAddress, ITManTokenArtifacts.abi, library.getSigner(account));
    try {
      const amountInWei = ethers.utils.parseUnits(amount, "ether");
      const approveTx = await tokenContract.approve(otcMarketAddress, amountInWei);
      await approveTx.wait();
      toast.success("Token usage approved successfully.");
      
      const otcContract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner(account));
      const listTx = await otcContract.listTokenForSale(tokenAddress, amountInWei, ethers.utils.parseUnits(price, "ether"));
      await listTx.wait();
      toast.success("Token listed for sale successfully.");
      fetchListings();
    } catch (error) {
      console.error("Failed to list token for sale or approval failed:", error);
      toast.error("Could not complete the operation.");
    }
  };

  const cancelListing = async (listingId, isTokenListing) => {
    const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner(account));
    try {
      const tx = await contract.cancelListing(listingId, isTokenListing);
      await tx.wait();
      toast.success("Listing cancelled successfully.");
      fetchListings();
    } catch (error) {
      console.error("Failed to cancel listing:", error);
      toast.error("Could not cancel listing.");
    }
  };

  const cancelListingByOwner = async (listingId, isTokenListing) => {
    if (!isOwner) {
      toast.error("Only the contract owner can cancel listings this way.");
      return;
    }
  
    const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner());
    try {
      const tx = await contract.cancelListingByOwner(listingId, isTokenListing);
      await tx.wait();
      toast.success("Listing cancelled by owner successfully.");
      fetchListings();
    } catch (error) {
      console.error("Failed to cancel listing by owner:", error);
      toast.error("Could not cancel listing by owner.");
    }
  };

  return (
    <div>
      <h2>OTC Market</h2>
      <div>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price in ETH"
        />
        <button onClick={listTokenForSale}>List Token For Sale</button>
      </div>
      <div>
        <h3>Token Listings</h3>
        {tokenListings.map((listing, index) => (
          <div key={index}>
            <p>ID: {index} Seller: {listing.seller}</p>
            <p>Amount: {ethers.utils.formatUnits(listing.amount, "ether")}</p>
            <p>Price: {ethers.utils.formatUnits(listing.price, "ether")} ETH</p>
            <button onClick={() => cancelListing(index, true)}>Cancel Listing</button>
            {isOwner && (
              <button onClick={() => cancelListingByOwner(index, true)}>
                Cancel as Owner
              </button>
            )}
          </div>
        ))}
      </div>
      <div>
        <h3>ETH Listings</h3>
        {ethListings.map((listing, index) => (
          <div key={index}>
            <p>ID: {index} Buyer: {listing.buyer}</p>
            <p>Amount ETH: {ethers.utils.formatUnits(listing.amountEth, "ether")}</p>
            <button onClick={() => cancelListing(index, false)}>Cancel Listing</button>
            {isOwner && (
              <button onClick={() => cancelListingByOwner(index, false)}>
                Cancel as Owner
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OTCMarketComponent;