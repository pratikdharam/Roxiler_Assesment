const axios = require('axios');

// Get combined data from all three APIs
exports.getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;
    
    if (!month) {
      return res.status(400).json({
        success: false,
        message: 'Month parameter is required'
      });
    }
    
    // Base URL for API calls
    const baseUrl = `${req.protocol}://${req.get('host')}/api`;
    
    // Make parallel API calls to all three endpoints
    const [statisticsRes, barChartRes, pieChartRes] = await Promise.all([
      axios.get(`${baseUrl}/statistics?month=${month}`),
      axios.get(`${baseUrl}/bar-chart?month=${month}`),
      axios.get(`${baseUrl}/pie-chart?month=${month}`)
    ]);
    
    // Combine all responses
    const combinedData = {
      statistics: statisticsRes.data.data,
      barChart: barChartRes.data.data,
      pieChart: pieChartRes.data.data
    };
    
    return res.status(200).json({
      success: true,
      data: combinedData
    });
  } catch (error) {
    console.error('Get combined data error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch combined data'
    });
  }
};