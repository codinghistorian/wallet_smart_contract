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
  


  const url = "http://localhost:7545";

  let privateKey1 = process.env.PRIVATE_KEY1;
  let provider = new hre.ethers.providers.JsonRpcProvider(url)
  const user = new hre.ethers.Wallet(privateKey1,provider);
  const walletArtifact = require('../artifacts/contracts/1_Wallet.sol/Wallet.json');
  let abiWallet = walletArtifact.abi;
  let userOnWallet = new ethers.Contract(wallet.address,abiWallet,user);
  

// second wallet from ganache
async function main() {
  const ERC20A = await hre.ethers.getContractFactory("ERC20A");
  const erc20a = await ERC20A.attach(
    tokenA.address
  );
  const ERC20B = await hre.ethers.getContractFactory("ERC20B");
  const erc20b = await ERC20B.attach(
    tokenB.address
  );
  
  var ERCA_balanceInWallet = await erc20a.balanceOf(wallet.address);

  console.log("Balance of A in Wallet is : " + ERCA_balanceInWallet);
  
  var ERCB_balanceInWallet = await erc20b.balanceOf(wallet.address);

  console.log("Balance of B in Wallet is : " + ERCB_balanceInWallet);

  // function sendToken(IERC20 _token, address _to, uint _amount) external {

  // const thirdGuyGanache = "0xBAF6E8C611e54152b7b907f5e0E9815e771f565c";

  let transferResultTokenA = await userOnWallet.sendToken(tokenA.address, receiver.address, 11);
  
  console.log(transferResultTokenA);

  let transferResultTokenB = await userOnWallet.sendToken(tokenB.address, receiver.address, 11);
  
  console.log(transferResultTokenB);

    
  var ERCA_balanceInWalletAT = await erc20a.balanceOf(wallet.address);

  console.log("Balance of A in Wallet after transfer: " + ERCA_balanceInWalletAT);
  
  var ERCB_balanceInWalletAT = await erc20b.balanceOf(wallet.address);

  console.log("Balance of B in Wallet after transfer: " + ERCB_balanceInWalletAT);

  var ERCA_balanceInThirdGuy = await erc20a.balanceOf(receiver.address);

  console.log("Balance of A in receiver Contract is : " + ERCA_balanceInThirdGuy);
  
  var ERCB_balanceInThirdGuy = await erc20b.balanceOf(receiver.address);

  console.log("Balance of A in receiver Contract is " + ERCB_balanceInThirdGuy);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
