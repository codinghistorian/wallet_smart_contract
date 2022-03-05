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

var privateKey1 = process.env.PRIVATE_KEY1;

const USER = new hre.ethers.Wallet(privateKey1,provider);


  const walletArtifact = require('../artifacts/contracts/1_Wallet.sol/Wallet.json');

  
  let walletAsUSER = new ethers.Contract(wallet.address,walletArtifact.abi,USER);

   // 220305 20:08 KST  imma check allowance with event.
  // function approve(IERC20 _token, address _spender, uint _amount) external {
 
  var approveInit = await walletAsUSER.approve(tokenA.address, receiver.address, 11);
  await approveInit.wait();
  console.log(approveInit);
 
  //220305 20:14 how to do waffle test for event..?

  // function allowanceIncrease(IERC20 _token, address _spender, uint _amount) external {

  // var approveIncre = await walletAsUSER.allowanceIncrease(tokenA.address, receiver.address, 22);

  // await approveIncre.owner();
  // console.log(approveIncre);

  // function allowanceDecrease(IERC20 _token, address _spender, uint _amount) external {

  // var approveDecre = await walletAsUSER.allowanceDecrease(tokenA.address, receiver.address, 9);

  // await approveDecre.owner();
  // console.log(approveDecre);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
