// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');
const path = require('path');
const { logger } = require("ethers");
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

// 220305 03:30 KST send some eth to the wallet smart contract.Let's let the
const url = "http://localhost:7545";

let provider = new hre.ethers.providers.JsonRpcProvider(url);

var privateKey2 = process.env.PRIVATE_KEY2;

const thirdGuy = new hre.ethers.Wallet(privateKey2,provider);


var tx = {
  to: wallet.address,
  value: hre.ethers.utils.parseEther("1.0")
}
//now send ether from the third guy.
let thirdGuySendEth = await thirdGuy.sendTransaction(tx)

await thirdGuySendEth.wait();

console.log(thirdGuySendEth);

const WalletInstance = await hre.ethers.getContractFactory("Wallet");
const walletInstance = await WalletInstance.attach(
  wallet.address
);

let walletETHBalance = await walletInstance.balance();
// 220305 03:49 no need to await for state variable getter. It ain't sending tx, so.
// await walletETHBalance.wait();
console.log("Wallet ETH balance is "+walletETHBalance);
// 220305 03:50 KST now let the user call sendETH function of the smart contract wallet.
var privateKey1 = process.env.PRIVATE_KEY1;

console.log("pass1");

const USER = new hre.ethers.Wallet(privateKey1,provider);

console.log("pass2");

const walletArtifact = require('../artifacts/contracts/1_Wallet.sol/Wallet.json');

console.log("pass3");

let walletAsUser = new ethers.Contract(wallet.address,walletArtifact.abi,USER);
// function sendETH(address _to, uint _valueInWei) external returns(bool) {

console.log("pass4");

const fourthGuy = "0x6979a7dc95efdB27d39aa74FDd529e4c4e03A04f";
var valueInWei = hre.ethers.utils.parseEther("1.0");
let result = await walletAsUser.sendETH(fourthGuy, valueInWei);

await result.wait();

console.log(result);

const balance3rdETH = await provider.getBalance(thirdGuy.address);
const balance4thETH = await provider.getBalance(fourthGuy);

console.log("ETH balance of 3rd guy  " + balance3rdETH);

console.log("ETH balance of 4th guy  " + balance4thETH);

//220305 04:09 KST. Okay the sendETH works now.


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
