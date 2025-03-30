import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config";

export const connectContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed!");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  console.log(signer.getAddress())
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  return {contract, signer};
};

export const getAllCampaigns = async () => {
    const {contract} = await connectContract();
    const campaigns = await contract.getCampaigns();

    return campaigns.map((campaign, id) => ({
        id,
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.formatEther(campaign.target),
        deadline: Number(campaign.deadline),
        amountCollected: ethers.formatEther(campaign.amountCollected),
        image: campaign.image,
        donators: campaign.donators,
        donations: campaign.donations.map(d => ethers.formatEther(d))
    }));
};

export const createCampaign = async (campaignData) => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const {contract, signer} = await connectContract();
  const { title, description, target, deadline, image } = campaignData;

  const signerAddress = await signer.getAddress();
  console.log(signerAddress)

  const tx = await contract.createCampaign(
      signerAddress,
      title,
      description,
      ethers.parseEther(target.toString()),
      Math.floor(new Date(deadline).getTime() / 1000),
      image
  );
  await tx.wait();
};

export const donateToCampaign = async (id, amount) => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const {contract} = await connectContract();

  const sanitizedAmount = Number(amount).toFixed(18);
  
  const tx = await contract.donateToCampaign(id, {
      value: ethers.parseEther(sanitizedAmount),
  });
  await tx.wait();
};