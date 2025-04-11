const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Vendor", function () {
  let owner, user1, user2;
  let YourToken, Vendor;
  let yourToken, vendor;

  // Deploy contracts before each test
  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy YourToken contract
    YourToken = await ethers.getContractFactory("YourToken");
    yourToken = await YourToken.deploy(ethers.parseEther("1000000"));
    await yourToken.waitForDeployment();

    // Deploy Vendor contract
    Vendor = await ethers.getContractFactory("Vendor");
    vendor = await Vendor.deploy(await yourToken.getAddress());
    await vendor.waitForDeployment();

    // Transfer initial tokens to Vendor (100,000 tokens)
    await yourToken.transfer(
      await vendor.getAddress(),
      ethers.parseEther("100000")
    );
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await vendor.owner()).to.equal(owner.address);
    });

    it("Should assign the token contract correctly", async function () {
      expect(await vendor.yourToken()).to.equal(await yourToken.getAddress());
    });

    it("Should have tokens in vendor contract", async function () {
      const vendorBalance = await yourToken.balanceOf(await vendor.getAddress());
      expect(vendorBalance).to.equal(ethers.parseEther("100000"));
    });
  });

  describe("Buy Tokens", function () {
    it("Should buy tokens correctly", async function () {
      const ethAmount = ethers.parseEther("1");
      const expectedTokens = ethAmount * 100n;

      await expect(() =>
        vendor.connect(user1).buyTokens({ value: ethAmount })
      ).to.changeTokenBalance(yourToken, user1, expectedTokens);
    });

    it("Should emit BuyTokens event", async function () {
      const ethAmount = ethers.parseEther("1");
      await expect(vendor.connect(user1).buyTokens({ value: ethAmount }))
        .to.emit(vendor, "BuyTokens")
        .withArgs(user1.address, ethAmount, ethAmount * 100n);
    });

    it("Should fail if vendor has insufficient tokens", async function () {
      const largeAmount = ethers.parseEther("1001"); // More than vendor has
      await expect(
        vendor.connect(user1).buyTokens({ value: largeAmount })
      ).to.be.revertedWith("Vendor has insufficient tokens");
    });

    it("Should fail with zero ETH sent", async function () {
      await expect(
        vendor.connect(user1).buyTokens({ value: 0 })
      ).to.be.revertedWith("Send ETH to buy tokens");
    });
  });

  describe("Sell Tokens", function () {
    beforeEach(async function () {
      // First buy some tokens to test selling
      await vendor.connect(user1).buyTokens({ value: ethers.parseEther("1") });
    });

    it("Should sell tokens correctly", async function () {
      const tokenAmount = ethers.parseEther("100");
      const expectedEth = tokenAmount / 100n; // 100 tokens = 1 ETH

      // Approve vendor to spend tokens
      await yourToken.connect(user1).approve(
        await vendor.getAddress(),
        tokenAmount
      );

      await expect(() =>
        vendor.connect(user1).sellTokens(tokenAmount)
      ).to.changeEtherBalance(user1, expectedEth);
    });

    it("Should emit SellTokens event", async function () {
      const tokenAmount = ethers.parseEther("100");
      const expectedEth = tokenAmount / 100n;

      await yourToken.connect(user1).approve(
        await vendor.getAddress(),
        tokenAmount
      );

      await expect(vendor.connect(user1).sellTokens(tokenAmount))
        .to.emit(vendor, "SellTokens")
        .withArgs(user1.address, tokenAmount, expectedEth);
    });

    it("Should fail if vendor has insufficient ETH", async function () {
      // First drain vendor's ETH
      await vendor.connect(owner).withdraw();

      const tokenAmount = ethers.parseEther("100");
      await yourToken.connect(user1).approve(
        await vendor.getAddress(),
        tokenAmount
      );

      await expect(
        vendor.connect(user1).sellTokens(tokenAmount)
      ).to.be.revertedWith("Vendor has insufficient ETH");
    });

    it("Should fail with zero tokens", async function () {
      await expect(
        vendor.connect(user1).sellTokens(0)
      ).to.be.revertedWith("Specify an amount of tokens to sell");
    });
  });

  describe("Owner Functions", function () {
    it("Should allow owner to withdraw ETH", async function () {
      // First buy some tokens to add ETH to vendor
      await vendor.connect(user1).buyTokens({ value: ethers.parseEther("1") });

      const vendorBalance = await ethers.provider.getBalance(await vendor.getAddress());

      await expect(() =>
        vendor.connect(owner).withdraw()
      ).to.changeEtherBalance(owner, vendorBalance);
    });

    it("Should prevent non-owners from withdrawing", async function () {
      await expect(
        vendor.connect(user1).withdraw()
      ).to.be.revertedWithCustomError(vendor, "OwnableUnauthorizedAccount")
       .withArgs(user1.address);
    });

    it("Should allow owner to deposit tokens", async function () {
      const amount = ethers.parseEther("1000");
      await yourToken.approve(await vendor.getAddress(), amount);

      await expect(() =>
        vendor.connect(owner).depositTokens(amount)
      ).to.changeTokenBalance(yourToken, vendor, amount);
    });

    it("Should prevent non-owners from depositing tokens", async function () {
      const amount = ethers.parseEther("1000");
      await expect(
        vendor.connect(user1).depositTokens(amount)
      ).to.be.revertedWithCustomError(vendor, "OwnableUnauthorizedAccount")
       .withArgs(user1.address);
    });
  });

  describe("Edge Cases", function () {
    it("Should handle maximum token amounts correctly", async function () {
      // Test with very large amounts
      const largeAmount = ethers.parseEther("10000");
      await yourToken.connect(owner).transfer(await vendor.getAddress(), largeAmount);
      
      await expect(
        vendor.connect(user1).buyTokens({ value: largeAmount / 100n })
      ).to.changeTokenBalance(yourToken, user1, largeAmount);
    });

    it("Should handle small amounts correctly", async function () {
      // Test with very small amounts (1 wei)
      const smallAmount = 1n;
      await expect(
        vendor.connect(user1).buyTokens({ value: smallAmount })
      ).to.changeTokenBalance(yourToken, user1, smallAmount * 100n);
    });
  });
});