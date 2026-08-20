import React, { useState } from 'react';

const MyRewards = () => {
  const [activeTab, setActiveTab] = useState('UNLOCKED');
  const [selectedReward, setSelectedReward] = useState(null);
  
  // Explicitly marked mock data for frontend demo
  const rewards = [
    {
      rewardId: 'R001',
      milestoneId: 'mile-7',
      rewardType: 'MONETARY',
      rewardValue: 25,
      status: 'UNLOCKED',
      issuedAt: '2026-08-10T10:00:00Z',
      expiresAt: '2026-09-10T10:00:00Z',
      title: '₹25 Wallet Cash',
      description: 'Use this ₹25 cash on any purchase without minimum order value.'
    },
    {
      rewardId: 'R002',
      milestoneId: 'mile-15',
      rewardType: 'FREE_ITEM',
      rewardValue: 49,
      status: 'UNLOCKED',
      issuedAt: '2026-08-15T10:00:00Z',
      expiresAt: '2026-09-15T10:00:00Z',
      title: 'Free Grocery Item',
      description: 'Get any grocery item up to ₹49 absolutely free on your next order.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="flex items-center mb-6">
        <button onClick={() => window.history.back()} className="mr-4 text-gray-500 hover:text-green-600 font-bold">&larr; Back</button>
        <h1 className="text-3xl font-bold text-gray-900">My Rewards</h1>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl shadow-sm border border-green-200">
          <div className="text-sm text-green-700 font-medium mb-1">Value Unlocked</div>
          <div className="text-3xl font-bold text-gray-900">₹75</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-2xl shadow-sm border border-orange-200">
          <div className="text-sm text-orange-700 font-medium mb-1">Free Items</div>
          <div className="text-3xl font-bold text-gray-900">3</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl shadow-sm border border-blue-200">
          <div className="text-sm text-blue-700 font-medium mb-1">Merchandise</div>
          <div className="text-3xl font-bold text-gray-900">1</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl shadow-sm border border-purple-200">
          <div className="text-sm text-purple-700 font-medium mb-1">Shopping Days</div>
          <div className="text-3xl font-bold text-gray-900">18</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-gray-200 mb-6 pb-1 scrollbar-hide">
        {['UNLOCKED', 'REDEEMED', 'EXPIRED', 'LOCKED'].map(tab => (
          <button
            key={tab}
            className={`py-2 px-5 font-bold text-sm whitespace-nowrap rounded-t-lg transition-colors ${
              activeTab === tab 
                ? 'border-b-2 border-green-500 text-green-700 bg-green-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Rewards List */}
      <div className="grid gap-4">
        {rewards.filter(r => r.status === activeTab).length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="text-4xl mb-3">🎁</div>
            <h3 className="text-lg font-bold text-gray-700">No rewards here</h3>
            <p className="text-gray-500 mt-1">Keep shopping to unlock more milestones!</p>
          </div>
        ) : (
          rewards.filter(r => r.status === activeTab).map(reward => (
            <div key={reward.rewardId} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4 md:mb-0">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mr-4 ${reward.rewardType === 'MONETARY' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                  {reward.rewardType === 'MONETARY' ? '₹' : '🎁'}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{reward.title}</h3>
                  <p className="text-gray-500 text-sm">Value: ₹{reward.rewardValue}</p>
                  {reward.status === 'UNLOCKED' && (
                    <p className="text-xs font-bold text-orange-500 mt-1 flex items-center">
                      <span className="mr-1">⏳</span> Expires: {new Date(reward.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              
              {reward.status === 'UNLOCKED' && (
                <button 
                  onClick={() => setSelectedReward(reward)}
                  className="w-full md:w-auto bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-green-700 transition-colors"
                >
                  View Reward
                </button>
              )}
              {reward.status === 'REDEEMED' && (
                <span className="text-sm font-bold text-gray-400 bg-gray-100 px-4 py-2 rounded-xl">Redeemed</span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Reward Details Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setSelectedReward(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${selectedReward.rewardType === 'MONETARY' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                {selectedReward.rewardType === 'MONETARY' ? '₹' : '🎁'}
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">{selectedReward.title}</h2>
              <p className="text-green-600 font-bold mt-1">Value: ₹{selectedReward.rewardValue}</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-sm text-gray-600 border border-gray-100">
              <p className="mb-3">{selectedReward.description}</p>
              <div className="flex items-center text-xs font-bold text-orange-500">
                <span className="mr-2">⏳</span> Valid until {new Date(selectedReward.expiresAt).toLocaleDateString()}
              </div>
            </div>
            
            <button 
              onClick={() => {
                alert('Claim action dispatched to backend. (Mock)');
                setSelectedReward(null);
              }}
              className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-colors shadow-md"
            >
              Claim Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRewards;
