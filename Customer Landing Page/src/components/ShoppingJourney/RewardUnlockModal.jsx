import React from 'react';
import useScrollLock from '../../hooks/useScrollLock';

const RewardUnlockModal = ({ isOpen, onClose, rewardDetails }) => {
  useScrollLock(isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl animate-bounce-in">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reward Unlocked!</h2>
        <p className="text-gray-600 mb-6">
          Congratulations! You've reached your {rewardDetails?.milestoneDays || 0}-day shopping streak.
        </p>
        
        <div className="bg-green-50 rounded-xl p-4 mb-6">
          <div className="font-bold text-lg text-green-800">
            {rewardDetails?.title || 'Special Reward'}
          </div>
          <div className="text-sm text-green-600 mt-1">
            Now available in your Reward Wallet
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default RewardUnlockModal;
