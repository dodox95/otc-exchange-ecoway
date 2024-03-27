EcoWay OTC Exchange Platform
Overview

EcoWay OTC Exchange is a robust software solution for projects that possess their native tokens and prefer not to list on DEX/CEX exchanges immediately or at all. The OTC Exchange facilitates peer-to-peer trading without the necessity of adding liquidity on an exchange platform.
Getting Started
Prerequisites

- Node.js
- Yarn package manager

Initial Setup

- Create a .env file by referencing the .env.example file. Input the necessary details as shared in the group discussion.
- Run the following command to install dependencies:

yarn install

- Ensure that your package.json contains the following line to specify the Yarn version:
  "packageManager": "yarn@1.22.21"

Wallet Seed Configuration

- To change the wallet seeds, replace the placeholder in the .env file:
  PRIVATE_KEY=<YOUR PRIVATE KEY>

For example:
PRIVATE_KEY=chujkurwaxdddd

Smart Contract Setup

- The smart contract is prepared for use, but if you wish to generate a new one, follow these steps:
  - Delete the existing directories src/types and src/artifacts.
  - To compile the smart contract, execute the following command in your terminal:

npx hardhat compile

-        This will regenerate the src/types and src/artifacts directories with updated contract data.

Contract Deployment

- To deploy the contract, run the following command in your terminal:
  npx hardhat run --network sepolia scripts/deploy_otcmarket.ts

- The terminal will display the generated contract addresses, for example:
  ITManToken deployed to: 0xEff3024c38eDf6fE0FF43329039b55cdc29Cf1FE
  Name: ITManToken
  Symbol: ITM
  Decimals: 18
  Total Supply: 1000000000000000000000000
  Owner: 0xE409E3a77952dBB9d5810B0Fedaa68BaF29F7494
  OTCMarket deployed to: 0xE1B5fF107a59F208391d4823E30193D01E4F1354

Running the Application

- To start the application, use the command:

yarn dev

License

This project is licensed under the MIT License - see the LICENSE.md file for details.
Social Links

https://t.me/dszafranski
