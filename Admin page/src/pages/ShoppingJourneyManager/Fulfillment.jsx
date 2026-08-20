import React from 'react';

const Fulfillment = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Merchandise Fulfilment</h1>
      
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <button onClick={() => alert("Viewing Pending claims")} className="py-2 px-4 font-medium text-sm border-b-2 border-green-500 text-green-600">Pending (1,245)</button>
        <button onClick={() => alert("Viewing Processing claims")} className="py-2 px-4 font-medium text-sm text-gray-500 hover:text-gray-700">Processing (432)</button>
        <button onClick={() => alert("Viewing Shipped claims")} className="py-2 px-4 font-medium text-sm text-gray-500 hover:text-gray-700">Shipped (8,901)</button>
        <button onClick={() => alert("Viewing Delivered claims")} className="py-2 px-4 font-medium text-sm text-gray-500 hover:text-gray-700">Delivered</button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#CLM-9823</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SaathApp T-Shirt (L)</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-08-19</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  CLAIMED
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => alert("Processing claim #CLM-9823")} className="text-blue-600 hover:text-blue-900">Process &rarr;</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#CLM-9824</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SaathApp Mug</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-08-19</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  CLAIMED
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => alert("Processing claim #CLM-9824")} className="text-blue-600 hover:text-blue-900">Process &rarr;</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fulfillment;
