import { useEffect, useState } from 'react';
import { useMetaMask } from '../web3/metamask';
import { getAllCampaigns } from '../web3/contract';
import { CampaignCard } from './CampaignCard';
import { CreateCampaign } from './CreateCampaign';

export const Home = () => {
  const { account, connectWallet } = useMetaMask();
  const [campaigns, setCampaigns] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadCampaigns = async () => {
    const data = await getAllCampaigns();
    console.log(data)
    setCampaigns(data);
  };

  useEffect(() => {
    if (account) loadCampaigns();
  }, [account]);

  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">CrowdFund DApp</h1>
        <div className="flex items-center gap-4">
          {account ? (
            <span className="text-sm bg-gray-100 px-4 py-2 rounded">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Connect Wallet
            </button>
          )}
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            {showCreateForm ? 'Close Form' : 'Create Campaign'}
          </button>
        </div>
      </nav>

      {showCreateForm && <CreateCampaign onCreate={loadCampaigns} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {campaigns.map((campaign) => (
          <CampaignCard 
            key={campaign.id} 
            campaign={campaign} 
            onDonate={loadCampaigns} 
          />
        ))}
      </div>
    </div>
  );
};