import React, { useState } from 'react';

const WinnerSelection = () => {
  const [isSelecting, setIsSelecting] = useState(false);

  const handleSelectWinners = () => {
    setIsSelecting(true);
    // Simulate secure backend random selection process
    setTimeout(() => {
      setIsSelecting(false);
      alert('Secure selection process completed. Audit logs generated.');
    }, 2000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Winner Selection System</h1>
      
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-orange-700">
              <strong>Action Audited:</strong> Executing winner selection will generate a permanent audit log. 
              Only eligible customers are included. Employees and test accounts are automatically excluded by the system rules.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Current Campaign: The SaathApp Grand Reward</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Eligible Pool</p>
            <p className="text-xl font-bold">12,450</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Winners to Select</p>
            <p className="text-xl font-bold">100</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-xl font-bold text-blue-600">PENDING</p>
          </div>
        </div>
        
        <button 
          onClick={handleSelectWinners}
          disabled={isSelecting}
          className={`transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-6 py-2 rounded text-white font-medium ${isSelecting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isSelecting ? 'Executing Secure Selection...' : 'Execute Winner Selection'}
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">Past Winners (Audit Trail)</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Selection Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Winners Selected</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Triggered By</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2026-07-01 10:00:00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">July Mega Rewards</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">admin_user2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinnerSelection;
