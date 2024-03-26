// scripts\show_active.js
const ethers = require('ethers');
require('dotenv').config({ path: '../.env' });


const OTCMarketArtifacts = require('../src/artifacts/contracts/OTC.sol/OTCMarket.json');

const otcMarketAddress = process.env.OTC_EXCHANGE_ADDRESS;
const providerUrl = process.env.SEPOLIA_PROVIDER_URL; 
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

const otcMarket = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, provider);

async function showActiveListings() {
    // Pobieranie aktywnych ofert tokenów
    const tokenListings = await otcMarket.getActiveTokenListings();
    console.log('Active Token Listings:');
    tokenListings.forEach(listing => {
        console.log(`Listing ID: ${listing.listingId}, Seller: ${listing.listing.seller}, Token Address: ${listing.listing.tokenAddress}, Amount: ${listing.listing.amount}, Price: ${listing.listing.price}`);
    });

    // Pobieranie aktywnych ofert ETH
    const ethListings = await otcMarket.getActiveEthListings();
    console.log('\nActive ETH Listings:');
    ethListings.forEach(listing => {
        console.log(`Listing ID: ${listing.listingId}, Buyer: ${listing.listing.buyer}, ETH Amount: ${listing.listing.amountEth}, Token Address: ${listing.listing.tokenAddress}, Token Amount Wanted: ${listing.listing.tokenAmountWanted}`);
    });
}

showActiveListings().catch(console.error);
