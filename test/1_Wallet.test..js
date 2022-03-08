const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Wallet", async function () {
  let owner
  let walletUser
  let ethDoner
  let comissionTaker
  let Wallet
  let wallet
  beforeEach(async() => {
    [owner, walletUser, ethDoner, comissionTaker] = await ethers.getSigners();
    Wallet = await ethers.getContractFactory("Wallet");
    wallet = await Wallet.deploy(walletUser.address, comissionTaker.address);
  
    await wallet.deployed();
  })
  it("Who is the wallet contract's owner?", async ()=> {
    const ownerOfContract = await wallet.owner();
    assert.equal(ownerOfContract, owner.address, "Owner is not right, bruh");
  })

  it("Fee to equal 999999999999999", async ()=> {
    const fee = await wallet.feeHow();
    assert.equal(fee, 999999999999999, "Fee ain't right, bruh");
  })
});
