import React, { useState } from 'react';

const MilestoneConfig = () => {
  const [milestones, setMilestones] = useState([
    { id: 'mile-7', days: 7, type: 'MONETARY', value: 25, title: '₹25 Reward', active: true },
    { id: 'mile-15', days: 15, type: 'FREE_ITEM', value: 49, title: 'Free Item up to ₹49', active: true },
    { id: 'mile-30', days: 30, type: 'MONETARY', value: 99, title: '₹99 Reward', active: true },
    { id: 'mile-60', days: 60, type: 'MERCHANDISE', value: null, title: 'SaathApp Merchandise', active: true },
    { id: 'mile-90', days: 90, type: 'SPECIAL', value: null, title: 'Premium Reward', active: true },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Milestone Configuration</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days Req</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reward Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {milestones.map((milestone) => (
              <tr key={milestone.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{milestone.days} Days</td>
                <td className="px-6 py-4 whitespace-nowrap">{milestone.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{milestone.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${milestone.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {milestone.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => alert(`Editing milestone: ${milestone.title}`)} className="text-blue-600 hover:text-blue-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button onClick={() => alert("Opening 'Add Milestone' modal")} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
          + Add New Milestone
        </button>
      </div>
    </div>
  );
};

export default MilestoneConfig;
