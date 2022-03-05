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

  
  // let walletAsUSER = new ethers.Contract(wallet.address,walletArtifact.abi,USER);

   // 220305 20:08 KST  imma check allowance with event.
  // function approve(IERC20 _token, address _spender, uint _amount) external {
 
  // var approveInit = await walletAsUSER.approve(tokenA.address, receiver.address, 11);
  // await approveInit.wait();
  // console.log(approveInit);

  //220305 20:14 how to do waffle test for event..?

  // function allowanceIncrease(IERC20 _token, address _spender, uint _amount) external {

  // var approveIncre = await walletAsUSER.allowanceIncreaseBy(tokenA.address, receiver.address, 22);

  // await approveIncre.wait();
  // console.log(approveIncre);

  // function allowanceDecrease(IERC20 _token, address _spender, uint _amount) external {

  // var approveDecre = await walletAsUSER.allowanceDecreaseBy(tokenA.address, receiver.address, 3);

  // await approveDecre.wait();
  // console.log(approveDecre);

  // let abi = [
  //   "event Allowance(address indexed spender, uint indexed value)"
  // ];

  
  // let contract = new hre.ethers.Contract(wallet.address, abi, provider);
  // let eventFilter = contract.filters.Allowance(
  //   receiver.address
  //   );
  // let event = await contract.queryFilter(eventFilter)

  // console.log(event);


  // Allowance Init
  let abi0 = [
    "event AllowanceInit(address indexed spender, uint indexed value)"
  ];

  let contract0 = new hre.ethers.Contract(wallet.address, abi0, provider);
  let eventFilter0 = contract0.filters.AllowanceInit(
    receiver.address
    );
  let event0 = await contract0.queryFilter(eventFilter0);

  console.log(event0);


  // Allowance Inc by
  let abi1 = [
    "event AllowanceIncBy(address indexed spender, uint indexed value)"
  ];

  let contract1 = new hre.ethers.Contract(wallet.address, abi1, provider);
  let eventFilter1 = contract1.filters.AllowanceIncBy(
    receiver.address
    );
  let event1 = await contract1.queryFilter(eventFilter1);

  console.log(event1);


  // Allowance Dec by
  let abi2 = [
    "event AllowanceDecBy(address indexed spender, uint indexed value)"
  ];

  let contract2 = new hre.ethers.Contract(wallet.address, abi2, provider);
  let eventFilter2 = contract2.filters.AllowanceDecBy(
    receiver.address
    );
  let event2 = await contract2.queryFilter(eventFilter2);

  console.log(event2);



  const ERC20A = await hre.ethers.getContractFactory("ERC20A");
  const erc20a = await ERC20A.attach(
    tokenA.address
  );

  // allowance(address owner, address spender) → uint256
  let allowanceAmount = await erc20a.allowance(wallet.address, receiver.address);
  console.log(allowanceAmount);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
