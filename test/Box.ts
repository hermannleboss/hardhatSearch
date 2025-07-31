import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

// Default installation
describe("Box", function () {
  before(async function () {
    this.Box = await ethers.getContractFactory("Box");
  });

  beforeEach(async function () {
    this.box = await this.Box.deploy();
    // await this.box.deployed();
  });

  // Test case
  it("retrieve returns a value previously stored", async function () {
    // Store a value
    await this.box.store(42);

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.box.retrieve()).toString()).to.equal("42");
  });
});

// Transparent installation
describe("Box (Proxy)", function () {
  before(async function () {
    this.Box = await ethers.getContractFactory("Box");
  });

  beforeEach(async function () {
    // Deploying an upgradeable instance of the contract and
    // initializing it at the same time by calling store function with the value 42
    this.box = await upgrades.deployProxy(this.Box, [42], {
      initializer: "store",
    });
    await this.box.waitForDeployment();

    this.BoxV1Address= await this.box.getAddress();
    console.log('Box Proxy deployed to:', await this.box.getAddress());
    
    expect((await this.box.retrieve()).toString()).to.equal("42");
  });

  // Test case
  it("retrieve returns a value previously stored", async function () {
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    const BoxV2 = await ethers.getContractFactory("BoxV2");
    const box = await upgrades.upgradeProxy(BOX_ADDRESS, BoxV2);
    console.log("Box upgraded");
  });
});
