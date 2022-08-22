// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const ethers = hre.ethers;

require('dotenv').config();

async function main() {
  const provider = ethers.getDefaultProvider();
  const pk = '0xa62031205af76af4f7dee4cf1588cd810ac58c543beec9b208d2a5ca6fe0804a' //TODO: Replace with .env file 
  const wallet = new ethers.Wallet(pk, provider);
  const Bridge = await ethers.getContractFactory("BridgeContract", wallet);
  const bridge = await Bridge.deploy();
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
