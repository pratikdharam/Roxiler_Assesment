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

// Get bar chart data for a selected month
exports.getBarChartData = async (req, res) => {
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
    
    // Define price ranges
    const priceRanges = [
      { range: '0-100', min: 0, max: 100 },
      { range: '101-200', min: 101, max: 200 },
      { range: '201-300', min: 201, max: 300 },
      { range: '301-400', min: 301, max: 400 },
      { range: '401-500', min: 401, max: 500 },
      { range: '501-600', min: 501, max: 600 },
      { range: '601-700', min: 601, max: 700 },
      { range: '701-800', min: 701, max: 800 },
      { range: '801-900', min: 801, max: 900 },
      { range: '901-above', min: 901, max: Infinity }
    ];
    
    // Initialize chart data with all price ranges
    const chartData = [];
    
    // Get all transactions in this month
    const transactions = await Transaction.find(query);
    
    // Calculate items in each price range
    for (const range of priceRanges) {
      const count = transactions.filter(
        transaction => transaction.price >= range.min && transaction.price <= range.max
      ).length;
      
      chartData.push({
        priceRange: range.range,
        count
      });
    }
    
    return res.status(200).json({
      success: true,
      data: chartData
    });
  } catch (error) {
    console.error('Get bar chart data error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};