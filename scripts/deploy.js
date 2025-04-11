const { ethers } = require("hardhat");

async function main() {
  // Deploy YourToken
  const YourToken = await ethers.getContractFactory("YourToken");
  const yourToken = await YourToken.deploy(ethers.parseEther("1000000")); // Changed to ethers.parseEther
  await yourToken.waitForDeployment();
  console.log("YourToken deployed to:", await yourToken.getAddress());

  // Deploy Vendor
  const Vendor = await ethers.getContractFactory("Vendor");
  const vendor = await Vendor.deploy(await yourToken.getAddress());
  await vendor.waitForDeployment();
  console.log("Vendor deployed to:", await vendor.getAddress());

  // Transfer tokens to Vendor (1M tokens)
  await yourToken.transfer(await vendor.getAddress(), ethers.parseEther("1000000"));
  console.log("Transferred 1M tokens to Vendor");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });