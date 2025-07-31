import { ethers, upgrades } from "hardhat";

// scripts/deploy.js
const BOX_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
async function main() {
  // We get the contract to deploy
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  console.log("Deploying Upgradable Box...");

  const box = await upgrades.upgradeProxy(BOX_ADDRESS, BoxV2);
  console.log("Box upgraded to box V2");

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
