// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vendor is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public yourToken;
    uint256 public constant tokensPerEth = 100;
    uint256 public constant tokenPrice = 0.01 ether;

    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
    event SellTokens(address seller, uint256 amountOfTokens, uint256 amountOfETH);

    constructor(address tokenAddress) Ownable(msg.sender) {
        yourToken = IERC20(tokenAddress);
    }

    function buyTokens() public payable {
        require(msg.value > 0, "Send ETH to buy tokens");
        uint256 tokensToTransfer = msg.value * tokensPerEth;
        uint256 vendorBalance = yourToken.balanceOf(address(this));
        require(vendorBalance >= tokensToTransfer, "Vendor has insufficient tokens");

        yourToken.safeTransfer(msg.sender, tokensToTransfer);
        emit BuyTokens(msg.sender, msg.value, tokensToTransfer);
    }

    function sellTokens(uint256 tokenAmount) public {
        require(tokenAmount > 0, "Specify an amount of tokens to sell");

        uint256 ethToTransfer = tokenAmount * tokenPrice / 1 ether;
        uint256 vendorETHBalance = address(this).balance;
        require(vendorETHBalance >= ethToTransfer, "Vendor has insufficient ETH");

        yourToken.safeTransferFrom(msg.sender, address(this), tokenAmount);
        payable(msg.sender).transfer(ethToTransfer);

        emit SellTokens(msg.sender, tokenAmount, ethToTransfer);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(owner()).transfer(balance);
    }

    function depositTokens(uint256 amount) public onlyOwner {
        yourToken.safeTransferFrom(msg.sender, address(this), amount);
    }
}
