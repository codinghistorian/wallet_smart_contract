const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Wallet", function () {
  beforeEach(async () => {

    const [owner, walletUser, ethDoner, comissionTaker] = await ethers.getSigners();


    const Wallet = await hre.ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy(walletUser.address);
  
    await wallet.deployed();
  
    const TokenA = await hre.ethers.getContractFactory("ERC20A");
    const tokenA = await TokenA.deploy();
  
    await tokenA.deployed();
  
    const TokenB = await hre.ethers.getContractFactory("ERC20B");
    const tokenB = await TokenB.deploy();
  
    await tokenB.deployed();
  
    const Receiver = await hre.ethers.getContractFactory("Receiver");
    const receiver = await Receiver.deploy();
  
    await receiver.deployed();

  });
  describe("#Deployment", function () {
    it("All the contracts have right owners", async () => {

      let ownerTokenA = await tokenA.owner();
      assert.equal(ownerTokenA, owner.address);
    
      let ownerTokenB = await tokenB.owner();
      assert.equal(ownerTokenB, owner.address);
  
    });
  });

  describe("#Token Transfer", function () {
    it("Token transfer to the wallet smart contract", async () => {

      let transferA = await tokenA.transfer(wallet.address, 1000);
      await transferA.wait();

      let transferB = await tokenB.transfer(wallet.address, 1000);
      await transferB.wait();
      
      let ERCA_balanceInWallet = await transferA.balanceOf(wallet.address);
    
      assert.equal(ERCA_balanceInWallet, 1000);
      
      let ERCB_balanceInWallet = await transferB.balanceOf(wallet.address);
    
      assert.equal(ERCB_balanceInWallet, 1000);
    });
  });



});
