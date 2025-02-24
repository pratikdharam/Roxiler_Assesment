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

// Get pie chart data for a selected month
exports.getPieChartData = async (req, res) => {
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
    
    // Get category-wise item counts using aggregation
    const categoryData = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);
    
    return res.status(200).json({
      success: true,
      data: categoryData
    });
  } catch (error) {
    console.error('Get pie chart data error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};