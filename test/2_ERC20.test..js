const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
var chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN));

describe("Token", function () {
    let erc20a;
    let erc20b;
    before( async()=> {
      const ERC20A = await ethers.getContractFactory("ERC20A");
      erc20a = await ERC20A.deploy();
    
      await erc20a.deployed();
    
      const ERC20B = await ethers.getContractFactory("ERC20B");
      erc20b = await ERC20B.deploy();
    
      await erc20b.deployed();
    
    });
    it("All tokens have right names", async () => {
      
      let nameA = await erc20a.name();

      let nameB = await erc20b.name();

      expect(nameA).to.equal("ERC20A");
      expect(nameB).to.equal("ERC20B");
    });
    it("All tokens have right total supply", async () => {
      
      var totalSupplyA = await erc20a.totalSupply();
      totalSupplyA = totalSupplyA.toString();
      var totalSupplyB = await erc20b.totalSupply();
      totalSupplyB = totalSupplyB.toString();
 
      var expectedSupply = '100000000000000000000000000000';
      expect(totalSupplyA).to.eq(expectedSupply);
      expect(totalSupplyB).to.eq(expectedSupply);
    });
});
