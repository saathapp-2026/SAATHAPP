import React from 'react';

const MonthlyCampaignPromo = ({ isEligible = true }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Your Chance to Win!</h2>
        {isEligible ? (
          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Eligible
          </span>
        ) : (
          <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Keep Shopping
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mb-6">Stay active, shop regularly and be among the lucky winners every month.</p>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-6 w-6 rounded bg-green-100 flex items-center justify-center text-green-600 mr-3">✓</div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">SaathApp Merchandise</h4>
            <p className="text-xs text-gray-500">T-Shirts, Mugs & More</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 h-6 w-6 rounded bg-green-100 flex items-center justify-center text-green-600 mr-3">✓</div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Free Grocery Items</h4>
            <p className="text-xs text-gray-500">Up to ₹99</p>
          </div>
        </div>
      </div>
      
      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
        View Winners &rarr;
      </button>
    </div>
  );
};

export default MonthlyCampaignPromo;
