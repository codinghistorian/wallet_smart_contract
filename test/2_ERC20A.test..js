const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
    it("All tokens have right names", async () => {
      const ERC20A = await ethers.getContractFactory("ERC20A");
      const erc20a = await ERC20A.deploy();
    
      await erc20a.deployed();
    
      const ERC20B = await ethers.getContractFactory("ERC20B");
      const erc20b = await ERC20B.deploy();
    
      await erc20b.deployed();
    
      let nameA = await erc20a.name();

      let nameB = await erc20b.name();

      // assert.equal(nameA, "ERC20A", "Name was supposed to be ERC20A but it is not");
      expect(nameA).to.equal("ERC20A");
      expect(nameB).to.equal("ERC20B");
    });
  // });

});
