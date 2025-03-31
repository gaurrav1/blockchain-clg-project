import React, { useState, useEffect } from 'react';
import { DisplayCampaigns } from '../components';
import { getAllCampaigns } from '../web3/contract';
import { useMetaMask } from '../web3/metamask';  // Import the hook instead of function

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { account, getConnectedAccount } = useMetaMask();  // Use the hook
  console.log(account);

  // Fetch campaigns from the contract
  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
    setIsLoading(false);
  };

  // Auto-detect wallet connection
  useEffect(() => {
    const checkAccount = async () => {
      const connectedAccount = await getConnectedAccount();
      if (connectedAccount) {
        fetchCampaigns(); // Load campaigns when connected
      }
    };
    checkAccount();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log(accounts)
        fetchCampaigns(); // Reload campaigns on account change
      });
    }
  }, []);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};