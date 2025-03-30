import { useState, useEffect } from 'react';

export const useMetaMask = () => {
  const [account, setAccount] = useState(null);

  const checkNetwork = async () => {
    if (window.ethereum.networkVersion !== '11155111') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }] // Sepolia chain ID
        });
      } catch (err) {
        console.error('Failed to switch network:', err);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await checkNetwork();
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Connection error:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  return { account, connectWallet };
};
