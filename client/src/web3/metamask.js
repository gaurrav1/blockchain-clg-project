import { useState, useEffect } from 'react';

export const useMetaMask = () => {
  const [account, setAccount] = useState(null);

  // Function to check and switch to the correct network (Sepolia)
  const checkNetwork = async () => {
    if (window.ethereum.networkVersion !== '11155111') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }] // Sepolia Testnet
        });
      } catch (err) {
        console.error('Failed to switch network:', err);
      }
    }
  };

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      await checkNetwork();
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  // Function to check if an account is already connected
  const getConnectedAccount = async () => {
    if (!window.ethereum) return null;

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
      return accounts[0] || null;
    } catch (error) {
      console.error('Error checking connected account:', error);
      return null;
    }
  };

  // Auto-detect connected account when component mounts
  useEffect(() => {
    getConnectedAccount();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts.length ? accounts[0] : null);
      });
    }
  }, []);

  return { account, connectWallet, getConnectedAccount };
};
