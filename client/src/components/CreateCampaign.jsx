import { useState } from 'react';
import { createCampaign } from '../web3/contract';

export const CreateCampaign = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCampaign(formData);
    onCreate();
    setFormData({
      title: '',
      description: '',
      target: '',
      deadline: '',
      image: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Target (ETH)"
        value={formData.target}
        onChange={(e) => setFormData({ ...formData, target: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Create Campaign
      </button>
    </form>
  );
};
