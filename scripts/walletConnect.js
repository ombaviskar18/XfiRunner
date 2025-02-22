async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    alert("MetaMask is not installed. Please install it to use this app.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Connected account:", accounts[0]);
    switchToCrossFiNetwork();
    updateWalletButton(accounts[0]);
  } catch (error) {
    console.error("User rejected the request.");
  }
}

async function switchToCrossFiNetwork() {
  const crossFiTestnet = {
    chainId: "0x103D", // Chain ID for CrossFi Testnet (decimal 4157 converted to hex)
    chainName: "CrossFi Testnet",
    rpcUrls: ["https://rpc.testnet.ms/"], // Public RPC URL for CrossFi Testnet
    nativeCurrency: {
      name: "XFI",
      symbol: "XFI",
      decimals: 18,
    },
    blockExplorerUrls: ["https://test.xfiscan.com/"],
  };

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [crossFiTestnet],
    });
    console.log("Switched to CrossFi Testnet");
  } catch (error) {
    console.error("Failed to switch to CrossFi Testnet:", error);
  }
}

function updateWalletButton(account) {
  const walletButton = document.getElementById("walletButton");
  if (account) {
    walletButton.innerHTML = `${account}`;
  } else {
    walletButton.innerHTML = `<img src="assets/gui/achives.png" alt=""> connect wallet`;
  }
}

async function initialize() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        updateWalletButton(accounts[0]);
      } else {
        updateWalletButton(null);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }
}

// Call initialize function on page load
window.addEventListener("load", initialize);
