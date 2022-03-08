const { expect, assert } = require("chai");
const { ethers } = require("hardhat");


describe("Receiver", function () {
    let receiver;
    let owner;
    let walletUser;
    let ethDoner;
    let comissionTaker;

    before( async()=> {
      [owner, walletUser, ethDoner, comissionTaker] = await ethers.getSigners();
      const Receiver = await ethers.getContractFactory("Receiver");
      receiver = await Receiver.deploy();
    
      await receiver.deployed();
    
    });
      it("The contract can receiver either", async () => {
      var tx = {
        to: receiver.address,
        value: ethers.utils.parseEther("1.0")
      }
      let ethTx= await ethDoner.sendTransaction(tx)
      await ethTx.wait();

      const balanceReceiver = await ethers.provider.getBalance(receiver.address);
      expect(balanceReceiver).to.equal(tx.value);

    });
});
