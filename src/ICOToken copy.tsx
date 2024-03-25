import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import OTCMarketArtifacts from "../src/artifacts/contracts/OTC.sol/OTCMarket.json";
import ITManTokenArtifacts from "../src/artifacts/contracts/ITManToken.sol/ITManToken.json";

const tokenAddress = "0x60D247590c85a0330FC7a70D9Ee94Ce4D6C0090D";
const otcMarketAddress = "0xc7e4F1299e7aB542ddfc7C7f9f10922e9bC0194B";

function OTCMarketComponent() {
  const { account, library } = useWeb3React();
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [tokenListings, setTokenListings] = useState([]);
  const [ethListings, setEthListings] = useState([]);

  useEffect(() => {
    if (library) {
      fetchListings();
    }
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
    const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner(account));
    try {
      const tx = await contract.listTokenForSale(tokenAddress, ethers.utils.parseUnits(amount, "ether"), ethers.utils.parseUnits(price, "ether"));
      await tx.wait();
      toast.success("Token listed for sale successfully.");
      fetchListings();
    } catch (error) {
      console.error("Failed to list token for sale:", error);
      toast.error("Could not list token for sale.");
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
            <p>Seller: {listing.seller}</p>
            <p>Amount: {ethers.utils.formatUnits(listing.amount, "ether")}</p>
            <p>Price: {ethers.utils.formatUnits(listing.price, "ether")} ETH</p>
            <button onClick={() => cancelListing(listing.id, true)}>Cancel Listing</button>
          </div>
        ))}
      </div>
      <div>
        <h3>ETH Listings</h3>
        {ethListings.map((listing, index) => (
          <div key={index}>
            <p>Buyer: {listing.buyer}</p>
            <p>Amount ETH: {ethers.utils.formatUnits(listing.amountEth, "ether")}</p>
            <button onClick={() => cancelListing(listing.id, false)}>Cancel Listing</button>
          </div>
       ))}
       </div>
     </div>
   );
 }
 
 export default OTCMarketComponent;
 