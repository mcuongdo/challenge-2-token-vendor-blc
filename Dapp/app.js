// Cấu hình hợp đồng (thay bằng địa chỉ và ABI của bạn)
const CONFIG = {
    tokenAddress: "0x0B306BF915C4d645ff596e518fAf3F9669b97016", // Địa chỉ hợp đồng token
    vendorAddress: "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1", // Địa chỉ hợp đồng vendor
    tokenAbi: [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "initialSupply",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "allowance",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "needed",
              "type": "uint256"
            }
          ],
          "name": "ERC20InsufficientAllowance",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "needed",
              "type": "uint256"
            }
          ],
          "name": "ERC20InsufficientBalance",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "approver",
              "type": "address"
            }
          ],
          "name": "ERC20InvalidApprover",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            }
          ],
          "name": "ERC20InvalidReceiver",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "ERC20InvalidSender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "ERC20InvalidSpender",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ], // ABI của hợp đồng token
    vendorAbi: [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "OwnableInvalidOwner",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "OwnableUnauthorizedAccount",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            }
          ],
          "name": "SafeERC20FailedOperation",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountOfETH",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountOfTokens",
              "type": "uint256"
            }
          ],
          "name": "BuyTokens",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountOfTokens",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountOfETH",
              "type": "uint256"
            }
          ],
          "name": "SellTokens",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "buyTokens",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "depositTokens",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenAmount",
              "type": "uint256"
            }
          ],
          "name": "sellTokens",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenPrice",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokensPerEth",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "yourToken",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ], // ABI của hợp đồng vendor
};

  
  let web3;
  let accounts = [];
  let tokenContract;
  let vendorContract;
  
  window.addEventListener('load', async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
  
      try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        initContracts();
        await updateUI();
        setupEventListeners();
      } catch (error) {
        console.error("User denied account access:", error);
        alert("Vui lòng cho phép truy cập ví để tiếp tục.");
      }
    } else {
      alert("Bạn cần cài đặt MetaMask để sử dụng ứng dụng.");
    }
  });
  
  // Khởi tạo hợp đồng
  function initContracts() {
    tokenContract = new web3.eth.Contract(CONFIG.tokenAbi, CONFIG.tokenAddress);
    vendorContract = new web3.eth.Contract(CONFIG.vendorAbi, CONFIG.vendorAddress);
  }
  
  // Cập nhật giao diện người dùng
  async function updateUI() {
    if (!accounts.length) return;
  
    const account = accounts[0];
    document.getElementById("connect-btn").style.display = "none";
    document.getElementById("wallet-info").style.display = "block";
    document.getElementById("wallet-address").textContent =
      `${account.slice(0, 6)}...${account.slice(-4)}`;
  
    try {
      const ethBalance = await web3.eth.getBalance(account);
      document.getElementById("eth-balance").textContent =
        parseFloat(web3.utils.fromWei(ethBalance, 'ether')).toFixed(4);
  
      const tokenBalance = await tokenContract.methods.balanceOf(account).call();
      document.getElementById("token-balance").textContent = tokenBalance;
  
      document.getElementById("buy-btn").disabled = false;
      document.getElementById("sell-btn").disabled = false;
    } catch (error) {
      console.error("Lỗi khi cập nhật UI:", error);
    }
  }
  
  // Lắng nghe sự kiện
  function setupEventListeners() {
    document.getElementById("buy-btn").addEventListener("click", buyTokens);
    document.getElementById("sell-btn").addEventListener("click", sellTokens);
  }
  
  // Mua token
  async function buyTokens() {
    const amount = document.getElementById("buy-amount").value;
    const statusEl = document.getElementById("transaction-status");
  
    if (!amount || parseFloat(amount) <= 0) {
      alert("Vui lòng nhập số ETH hợp lệ.");
      return;
    }
  
    const weiAmount = web3.utils.toWei(amount, "ether");
    statusEl.innerHTML = `<div class="alert alert-info">Đang xử lý giao dịch mua...</div>`;
  
    try {
      await vendorContract.methods.buyTokens().send({
        from: accounts[0],
        value: weiAmount,
      });
  
      statusEl.innerHTML = `<div class="alert alert-success">Mua token thành công!</div>`;
      await updateUI();
    } catch (error) {
      console.error(error);
      statusEl.innerHTML = `<div class="alert alert-danger">Lỗi: ${error.message}</div>`;
    }
  }
  
  // Bán token
  async function sellTokens() {
    const amount = document.getElementById("sell-amount").value;
    const statusEl = document.getElementById("transaction-status");
  
    if (!amount || parseFloat(amount) <= 0) {
      alert("Vui lòng nhập số lượng token hợp lệ.");
      return;
    }
  
    statusEl.innerHTML = `<div class="alert alert-info">Đang xử lý giao dịch bán...</div>`;
  
    try {
      // Phê duyệt token
      await tokenContract.methods.approve(CONFIG.vendorAddress, amount).send({
        from: accounts[0],
      });
  
      // Bán token
      await vendorContract.methods.sellTokens(amount).send({
        from: accounts[0],
      });
  
      statusEl.innerHTML = `<div class="alert alert-success">Bán token thành công!</div>`;
      await updateUI();
    } catch (error) {
      console.error(error);
      statusEl.innerHTML = `<div class="alert alert-danger">Lỗi: ${error.message}</div>`;
    }
  }