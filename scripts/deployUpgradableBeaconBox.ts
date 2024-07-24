import { ethers, upgrades } from "hardhat";

// scripts/deploy.js
async function main() {
  // We get the contract to deploy
  const Box = await ethers.getContractFactory("Box");

  console.log("Deploying Beacon...");
  const beacon = await upgrades.deployBeacon(Box);
  await beacon.waitForDeployment();
  console.log("Beacon deployed to:", await beacon.getAddress());


  console.log("Deploying Upgradable Box...");
  const box = await upgrades.deployBeaconProxy(beacon, Box, [42], { initializer: "store" });
  await box.waitForDeployment();
  console.log("Upgradable Box deployed to:", await box.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
