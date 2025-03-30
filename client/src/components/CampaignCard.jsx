import { useState } from "react";
import { donateToCampaign } from "../web3/contract";

export const CampaignCard = ({ campaign, onDonate }) => {
  const [donationAmount, setDonationAmount] = useState('');

  const handleDonate = async () => {
    if (!donationAmount) return;
    await donateToCampaign(campaign.id, donationAmount);
    setDonationAmount('');
    onDonate();
  };

  return (
    <div className="campaign-card p-4 border rounded-lg shadow-md">
      <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
      <p className="text-gray-600 mb-4">{campaign.description}</p>
      <div className="flex justify-between mb-2">
        <span>Target: {campaign.target} ETH</span>
        <span>Raised: {campaign.amountCollected} ETH</span>
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          placeholder="ETH amount"
          className="flex-1 p-2 border rounded"
        />
        <button 
          onClick={handleDonate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Donate
        </button>
      </div>
    </div>
  );
};
