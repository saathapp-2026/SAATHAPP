import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingJourneyDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Journey Manager</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Participants</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">124,680</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Active Shoppers</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">86,400</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Rewards Unlocked</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">45,120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Pending Fulfilment</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">1,245</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-3">
            <li><Link to="/shopping-journey-dashboard" className="text-blue-600 hover:underline">Shopping Journey Dashboard</Link></li>
            <li><Link to="/shopping-journey-milestones" className="text-blue-600 hover:underline">Manage Reward Milestones</Link></li>
            <li><Link to="/shopping-journey-winners" className="text-blue-600 hover:underline">Winner Selection</Link></li>
            <li><Link to="/shopping-journey-fulfillment" className="text-blue-600 hover:underline">Redemption Requests</Link></li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
          <div className="text-sm text-gray-500 space-y-4">
            <p><strong>System</strong> unlocked 145 milestones in the last hour.</p>
            <p><strong>Admin user1</strong> updated Free Grocery reward stock.</p>
            <p><strong>System</strong> processed 42 redemption requests.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingJourneyDashboard;
