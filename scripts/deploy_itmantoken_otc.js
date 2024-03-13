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
  const otcMarket = await OTCMarket.deploy(itManToken.address); // Pass ITManToken's address as the token contract
  await otcMarket.deployed();
  console.log("OTCMarket deployed to:", otcMarket.address);

  // Optionally, you might want to approve the OTCMarket contract to spend tokens on behalf of the owner,
  // or perform other setup actions necessary for your application.
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
