// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');
const path = require('path');
require("dotenv").config();

// second wallet from ganache
var user = "0x0D42172E9a9410727B54a03Fd5509BE5968Da7c7";

async function main() {
  const Wallet = await hre.ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy(user);

  await wallet.deployed();

  console.log("Wallet deployed to:", wallet.address);

  const ERC20A = await hre.ethers.getContractFactory("ERC20A");
  const erc20a = await ERC20A.deploy();

  await erc20a.deployed();

  console.log("ERC20A deployed to:", erc20a.address);

  const ERC20B = await hre.ethers.getContractFactory("ERC20B");
  const erc20b = await ERC20B.deploy();

  await erc20b.deployed();

  console.log("ERC20B deployed to:", erc20b.address);

  let addresses = { 
    wallet: wallet.address,
    token1: erc20a.address,
    token2: erc20b.address
  };
  
  let data = JSON.stringify(addresses);
  fs.writeFileSync('addresses.json', data);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
