// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');
const path = require('path');
require("dotenv").config();

let rawdata = fs.readFileSync('addresses.json');
let addresses = JSON.parse(rawdata);

  const tokenA = {
    address : addresses.token1
  };
  const tokenB = {
    address : addresses.token2
  };
  const wallet = {
    address : addresses.wallet
  };

// second wallet from ganache
async function main() {
  const ERC20A = await hre.ethers.getContractFactory("ERC20A");
  const erc20a = await ERC20A.attach(
    tokenA.address
  );


  // let amountA = await erc20a.totalSupply();

  // console.log("ERC20A total supply : " + amountA);

  const ERC20B = await hre.ethers.getContractFactory("ERC20B");
  const erc20b = await ERC20B.attach(
    tokenB.address
  );

  // let amountB = await erc20b.totalSupply();

  // console.log("ERC20B total supply : " + amountB);

  // function transfer(address to, uint256 value) external returns (bool success);

  let transferA = await erc20a.transfer(wallet.address, 1000);
  await transferA.wait();
  console.log(transferA);

  let transferB = await erc20b.transfer(wallet.address, 1000);
  await transferB.wait();
  console.log(transferB);
  
  let ERCA_balanceInWallet = await erc20b.balanceOf(wallet.address);

  console.log("Balance of A in Wallet is : " + ERCA_balanceInWallet);
  
  let ERCB_balanceInWallet = await erc20b.balanceOf(wallet.address);

  console.log("Balance of B in Wallet is : " + ERCB_balanceInWallet);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
