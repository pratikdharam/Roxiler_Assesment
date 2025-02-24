const Transaction = require('../models/Transaction');

// Helper function to get month date range (reused from transactionController)
const getMonthDateRange = (month) => {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  const monthIndex = months.findIndex(m => m.toLowerCase() === month.toLowerCase());
  
  if (monthIndex === -1) {
    throw new Error('Invalid month. Please provide a month between January and December.');
  }
  
  return {
    $expr: {
      $eq: [{ $month: '$dateOfSale' }, monthIndex + 1]
    }
  };
};

// Get statistics for a selected month
exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    
    if (!month) {
      return res.status(400).json({
        success: false,
        message: 'Month parameter is required'
      });
    }
    
    // Build query based on month
    const query = getMonthDateRange(month);
    
    // Calculate total sale amount for the selected month
    const totalSaleAmount = await Transaction.aggregate([
      { $match: { ...query, sold: true } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    
    // Get total number of sold items for the selected month
    const soldItemsCount = await Transaction.countDocuments({
      ...query,
      sold: true
    });
    
    // Get total number of not sold items for the selected month
    const notSoldItemsCount = await Transaction.countDocuments({
      ...query,
      sold: false
    });
    
    return res.status(200).json({
      success: true,
      data: {
        totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].total : 0,
        totalSoldItems: soldItemsCount,
        totalNotSoldItems: notSoldItemsCount
      }
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};