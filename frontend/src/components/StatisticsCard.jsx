import React from 'react';

const StatisticsCard = ({ statistics, isLoading }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <h2 className="text-xl font-semibold mb-4">Transaction Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Transaction Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-1">Total Sale Amount</h3>
          <p className="text-2xl font-bold text-blue-700">
            {formatCurrency(statistics?.totalSaleAmount || 0)}
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="text-sm font-medium text-green-800 mb-1">Total Sold Items</h3>
          <p className="text-2xl font-bold text-green-700">
            {statistics?.totalSoldItems || 0}
          </p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <h3 className="text-sm font-medium text-red-800 mb-1">Total Unsold Items</h3>
          <p className="text-2xl font-bold text-red-700">
            {statistics?.totalNotSoldItems || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;