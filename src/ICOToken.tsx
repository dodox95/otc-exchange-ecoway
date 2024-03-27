// src\ICOToken.tsx
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import OTCMarketArtifacts from "../src/artifacts/contracts/OTC.sol/OTCMarket.json";
import ITManTokenArtifacts from "../src/artifacts/contracts/ITManToken.sol/ITManToken.json";

const tokenAddress = "0x786c0F5672AB580aDE52882A486d186d89812Ea3";
const otcMarketAddress = "0xD24dB8124b57dB7511860f98d78A914070E524Ba";

function OTCMarketComponent() {
  const { account, library } = useWeb3React();
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [tokenListings, setTokenListings] = useState([]);
  const [ethListings, setEthListings] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [actionType, setActionType] = useState('sell'); // 'sell' for selling tokens, 'buy' for buying with ETH

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

  const listEthForTokens = async () => {
    if (!amount || !price) {
      toast.error("Please enter both amount and price.");
      return;
    }

    try {
      const ethAmountInWei = ethers.utils.parseEther(price); // Assuming 'price' is the amount of ETH the user wants to spend
      const tokenAmountInWei = ethers.utils.parseUnits(amount, "ether");

      // You need to make sure your contract is payable if you're sending ETH with the transaction
      const otcContract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner(account));
      const listTx = await otcContract.listEthForTokens(tokenAddress, tokenAmountInWei, { value: ethAmountInWei });
      await listTx.wait();
      toast.success("ETH listed for tokens successfully.");
      fetchListings();
    } catch (error) {
      console.error("Failed to list ETH for tokens:", error);
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
  
  // Add two new functions in OTCMarketComponent

const purchaseTokenWithEth = async (listingId) => {
  if (!library || !account) {
    toast.error("Please connect your wallet.");
    return;
  }

  // Find the listing object based on listingId
  const listing = tokenListings.find(l => l.listingId === listingId);
  if (!listing) {
    toast.error("Listing not found.");
    return;
  }

  const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner());

  try {
    // Convert the price to BigNumber format
    const price = ethers.BigNumber.from(listing.listing.price);
    const tx = await contract.purchaseTokenWithEth(listingId, { value: price });
    await tx.wait();

    toast.success("Tokens purchased successfully.");
    fetchListings(); // Refresh listings to reflect the changes
  } catch (error) {
    console.error("Purchase failed:", error);
    toast.error("Failed to purchase tokens.");
  }
};


const purchaseTokenWithListing = async (ethListingId, tokenListingId) => {
  if (!library || !account) {
    toast.error("Please connect your wallet.");
    return;
  }

  try {
    const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner(account));
    const transaction = await contract.purchaseTokenWithListing(ethListingId, tokenListingId);
    await transaction.wait();
    toast.success("Trade successful!");
    fetchListings(); // Refresh listings
  } catch (error) {
    console.error("Trade failed:", error);
    toast.error("Trade failed.");
  }
};


const purchaseETHWithTokens = async (ethListingId) => {
  if (!library || !account) {
    toast.error("Please connect your wallet.");
    return;
  }

  const ethListing = ethListings.find(listing => listing.listingId === ethListingId);
  if (!ethListing) {
    toast.error("ETH listing not found.");
    return;
  }

  const tokenAmount = ethListing.listing.tokenAmountWanted;

  const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner(account));
  const tokenContract = new ethers.Contract(tokenAddress, ITManTokenArtifacts.abi, library.getSigner(account));

  try {
    // Najpierw zatwierdź tokeny do transferu
    const approvalTx = await tokenContract.approve(otcMarketAddress, tokenAmount);
    await approvalTx.wait();

    // Zrealizuj zakup ETH za tokeny
    const tx = await contract.purchaseETHWithTokens(ethListingId, tokenAmount);
    await tx.wait();

    toast.success("ETH purchased successfully with tokens.");
    fetchListings();
  } catch (error) {
    console.error("Purchase failed:", error);
    toast.error("Failed to purchase ETH with tokens.");
  }
};




  return (
  <div>
    <h2>OTC Market</h2>
    <div>
      {/* Allow users to choose an action: sell tokens or buy tokens with ETH */}
      <select value={actionType} onChange={(e) => setActionType(e.target.value)}>
        <option value="sell">Sell Tokens</option>
        <option value="buy">Buy Tokens with ETH</option>
      </select>
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
      {actionType === 'sell' && (
        <button onClick={listTokenForSale}>List Token For Sale</button>
      )}
      {actionType === 'buy' && (
        <button onClick={listEthForTokens}>List ETH For Tokens</button>
      )}
    </div>
      <div>
        <h3>Token Listings</h3>
        {
  tokenListings.map((listingWithId) => {
    const { listingId, listing } = listingWithId;
    return (
      <div key={listingId.toString()}>
        <p>ID: {listingId.toString()} Seller: {listing.seller}</p>
        <p>Amount: {ethers.utils.formatUnits(listing.amount, "ether")}</p>
        <p>Price: {ethers.utils.formatEther(listing.price)} ETH</p>
        <button onClick={() => cancelListing(listingId, true)}>Cancel Listing</button>
        <button onClick={() => purchaseTokenWithEth(listingId)}>Buy with ETH</button>
        {isOwner && (
              <button onClick={() => cancelListingByOwner(listingId, true)}>
                Cancel as Owner
              </button>
            )}
      </div>
      
    );
  })
}

      </div>

      <div>
  <h3>ETH Listings</h3>
  {
    ethListings.map((ethListingWithId) => {
      const { listingId: ethListingId, listing: ethListing } = ethListingWithId;
      return (
        <div key={ethListingId.toString()}>
          <p>ID: {ethListingId.toString()} Buyer: {ethListing.buyer}</p>
          <p>Amount ETH: {ethers.utils.formatEther(ethListing.amountEth)} ETH</p>
          <p>Token Amount Wanted: {ethers.utils.formatUnits(ethListing.tokenAmountWanted, "ether")} Tokens</p>
          <button onClick={() => cancelListing(ethListingId, false)}>Cancel Listing</button>
          <button onClick={() => purchaseETHWithTokens(ethListingId)}>Buy This ETH With Tokens</button>

          {isOwner && (
            <button onClick={() => cancelListingByOwner(ethListingId, false)}>
              Cancel as Owner
            </button>
          )}
        </div>
      );
    })
  }
</div>


    </div>
  );
  
}

export default OTCMarketComponent;