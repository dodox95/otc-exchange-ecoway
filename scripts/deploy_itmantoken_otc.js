// scripts\deploy_itmantoken_otc.js
const { ethers } = require("hardhat");

async function main() {
  // Deploy ITManToken contract
  const ITManToken = await ethers.getContractFactory("ITManToken");
  const itManToken = await ITManToken.deploy();
  await itManToken.deployed();
  console.log("ITManToken deployed to:", itManToken.address);

  // Display ITManToken contract details
  console.log("Name", await itManToken.name());
  console.log("Symbol", await itManToken.symbol());
  console.log("Decimals", await itManToken.decimals());
  const totalSupply = await itManToken.totalSupply();
  console.log("Total Supply", totalSupply.toString());
  const owner = await itManToken.owner();
  console.log("Owner", owner);

  // Deploy OTCMarket contract
  const OTCMarket = await ethers.getContractFactory("OTCMarket");
  const otcMarket = await OTCMarket.deploy(); // Usunięcie argumentu
  await otcMarket.deployed();
  console.log("OTCMarket deployed to:", otcMarket.address);

  // Tutaj można dodać logikę ustawiania uprawnień dla kontraktu OTCMarket, jeśli jest to konieczne
  // Na przykład: approve OTCMarket contract to spend tokens on behalf of the token owner.
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
