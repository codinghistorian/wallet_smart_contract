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
  const receiver = {
    address : addresses.receiver
  };

// second wallet from ganache
async function main() {
const url = "http://localhost:7545";

let provider = new hre.ethers.providers.JsonRpcProvider(url);

var privateKey0 = process.env.PRIVATE_KEY0;

const OWNER = new hre.ethers.Wallet(privateKey0,provider);


  const walletArtifact = require('../artifacts/contracts/1_Wallet.sol/Wallet.json');

  let walletAsOWNER = new ethers.Contract(wallet.address,walletArtifact.abi,OWNER);
  // function feeHow() view external onlyOwner returns(uint)

  // function changeFee(uint _new) external onlyOwner {
  var changeFee = await walletAsOWNER.changeFee(3);
  await changeFee.wait();

  var howMuchFee = await walletAsOWNER.feeHow();
  console.log(howMuchFee)

  var deployerIsWho = await walletAsOWNER.owner();
  console.log(deployerIsWho);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
