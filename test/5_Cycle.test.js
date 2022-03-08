const { expect, assert } = require("chai");
const { ethers } = require("hardhat");


describe("Whole Test Cycle", function () {
    let owner;
    let walletUser;
    let ethDoner;
    let comissionTaker;

    let receiver;
    let wallet;
    let erc20a;
    let erc20b;
    let walletArtifact;
    before( async()=> {
      walletArtifact = require('../artifacts/contracts/1_Wallet.sol/Wallet.json');
      [owner, walletUser, ethDoner, comissionTaker] = await ethers.getSigners();

      const Wallet = await ethers.getContractFactory("Wallet");
      wallet = await Wallet.deploy(walletUser.address, comissionTaker.address);

      const Receiver = await ethers.getContractFactory("Receiver");
      receiver = await Receiver.deploy();
    
      await receiver.deployed();

      const ERC20A = await ethers.getContractFactory("ERC20A");
      erc20a = await ERC20A.deploy();
    
      await erc20a.deployed();
    
      const ERC20B = await ethers.getContractFactory("ERC20B");
      erc20b = await ERC20B.deploy();
    
      await erc20b.deployed();
    
    });
    describe("ERC token tests", () => {
      let transferA;
      let transferB;
      before (async () => {
        transferA = await erc20a.transfer(wallet.address, 1000);
        await transferA.wait();
  
        transferB = await erc20b.transfer(wallet.address, 1000);
        await transferB.wait();
      });
      it("Wallet receives ERC tokens", async () => {
        let ERCA_balanceInWallet = await erc20b.balanceOf(wallet.address);
  
        expect(ERCA_balanceInWallet).to.equal('1000');
        let ERCB_balanceInWallet = await erc20b.balanceOf(wallet.address);
  
        expect(ERCB_balanceInWallet).to.equal('1000'); 
        
    });
    it("Wallet sends ERC tokens", async () => {

      let walletAsUser = new ethers.Contract(wallet.address,walletArtifact.abi,walletUser);
      const tx1 = await walletAsUser.sendToken(erc20a.address, receiver.address, 500);
      await tx1.wait();
      const tx2 = await walletAsUser.sendToken(erc20b.address, receiver.address, 500);
      await tx2.wait();
      expect(await erc20a.balanceOf(receiver.address)).to.equal('500');
      expect(await erc20b.balanceOf(receiver.address)).to.equal('500');
  });
  it("Wallet approves Receiver contract to manipulate ERC20s", async () => {

    let walletAsUser = new ethers.Contract(wallet.address,walletArtifact.abi,walletUser);
    // function approve(IERC20 _token, address _spender, uint _amount) external {
    const tx1 = await walletAsUser.approve(erc20a.address, receiver.address, 300);
    await tx1.wait();

    const tx2 = await walletAsUser.approve(erc20b.address, receiver.address, 300);
    await tx2.wait();
    // allowance(address owner, address spender) → uint256

    const allowanceA = await erc20a.allowance(wallet.address, receiver.address);
    const allowanceB = await erc20b.allowance(wallet.address, receiver.address);
    expect(allowanceA).to.equal(300);
    expect(allowanceB).to.equal(300);
  


});

});
    describe("ETH transfer tests", () => {
      var tx1;
      before (async ()=>{
        tx1 = {
          to: wallet.address,
          value: ethers.utils.parseEther("1.0")
        }
        let ethTx= await ethDoner.sendTransaction(tx1);
        await ethTx.wait();
      });
      it("Wallet contract can receiver either", async () => {
        const balanceWallet = await ethers.provider.getBalance(wallet.address);
        expect(balanceWallet).to.equal(tx1.value);
      });
      it("Wallet contract can send either", async () => {
        let walletAsUser = new ethers.Contract(wallet.address,walletArtifact.abi,walletUser);
        // function sendETH(address _to, uint _valueInWei) external returns(bool) {
        var tx2 = await walletAsUser.sendETH(receiver.address, ethers.utils.parseEther("0.5"));
        await tx2.wait();
        const balanceReceiver = await ethers.provider.getBalance(receiver.address);
        expect(balanceReceiver).to.be.below(ethers.utils.parseEther("0.5"));
        expect(balanceReceiver).to.be.above(ethers.utils.parseEther("0.45"));
      });
      it("ComissionTaker received ether", async () => {
        let walletAsUser = new ethers.Contract(wallet.address,walletArtifact.abi,walletUser);
        // function sendETH(address _to, uint _valueInWei) external returns(bool) {
        var tx2 = await walletAsUser.sendETH(receiver.address, ethers.utils.parseEther("0.5"));
        await tx2.wait();
        const balanceCommissionTaker = await ethers.provider.getBalance(comissionTaker.address);
        expect(balanceCommissionTaker).to.be.above(ethers.utils.parseEther("100"));
      });
    });
    describe("Wallet contract Owner can change fee", () => {
      // function feeHow() view external onlyOwner returns(uint) {
      // function changeFee(uint _new) external onlyOwner {
      var tx1;
      before (async ()=>{
        tx1 = {
          to: wallet.address,
          value: ethers.utils.parseEther("1.0")
        }
        let ethTx= await ethDoner.sendTransaction(tx1);
        await ethTx.wait();
      });
      it("changed fee is correct", async() => {
        let walletAsOwner = new ethers.Contract(wallet.address,walletArtifact.abi,owner);
        const tx3 = await walletAsOwner.changeFee(11);
        await tx3.wait();

        const fee = await walletAsOwner.feeHow();
        expect(fee).to.equal(11);
      });
      it("ComissionTaker received ether", async () => {
        let walletAsOwner = new ethers.Contract(wallet.address,walletArtifact.abi,owner);
        const tx3 = await walletAsOwner.changeFee(11);
        await tx3.wait();

        const fee = await walletAsOwner.feeHow();
        expect(fee).to.equal(11);
        
        let walletAsUser = new ethers.Contract(wallet.address,walletArtifact.abi,walletUser);
        // function sendETH(address _to, uint _valueInWei) external returns(bool) {
        var tx2 = await walletAsUser.sendETH(receiver.address, ethers.utils.parseEther("0.5"));
        await tx2.wait();

        const balanceCommissionTaker = await ethers.provider.getBalance(comissionTaker.address);
        expect(balanceCommissionTaker).to.be.above(ethers.utils.parseEther("100"));
      });

    });

});
