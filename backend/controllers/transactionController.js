const Transaction = require('../models/Transaction');

// Helper function to get month date range
const getMonthDateRange = (month) => {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  const monthIndex = months.findIndex(m => m.toLowerCase() === month.toLowerCase());
  
  if (monthIndex === -1) {
    throw new Error('Invalid month. Please provide a month between January and December.');
  }
  
  // Create date range for the specified month (for any year)
  // This query will match any year with the specified month
  return {
    $expr: {
      $eq: [{ $month: '$dateOfSale' }, monthIndex + 1]
    }
  };
};

// Get all transactions with search and pagination
exports.getTransactions = async (req, res) => {
  try {
    const { month, search = '', page = 1, perPage = 10 } = req.query;
    
    if (!month) {
      return res.status(400).json({
        success: false,
        message: 'Month parameter is required'
      });
    }
    
    // Calculate pagination values
    const pageNum = parseInt(page);
    const limit = parseInt(perPage);
    const skip = (pageNum - 1) * limit;
    
    // Build query based on month and search parameters
    let query = getMonthDateRange(month);
    
    // Add search criteria if provided
    if (search) {
      // Search in title, description, or convert search to number for price
      const priceSearch = !isNaN(parseFloat(search)) ? parseFloat(search) : -1;
      
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { price: priceSearch }
        ]
      };
    }
    
    // Execute query with pagination
    const transactions = await Transaction.find(query)
      .sort({ dateOfSale: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Transaction.countDocuments(query);
    
    return res.status(200).json({
      success: true,
      data: transactions,
      pagination: {
        total,
        page: pageNum,
        perPage: limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};