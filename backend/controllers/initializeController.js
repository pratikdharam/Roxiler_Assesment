const axios = require('axios');
const Transaction = require('../models/Transaction');

// Initialize database with seed data
exports.initializeDatabase = async (req, res) => {
  try {
    // Check if database already has data
    const count = await Transaction.countDocuments();
    if (count > 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'Database already initialized', 
        count 
      });
    }

    // Fetch data from the third-party API
    const apiUrl = process.env.API_URL;
    const response = await axios.get(apiUrl);
    const transactions = response.data;

    if (!transactions || !Array.isArray(transactions)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid data received from API' 
      });
    }

    // Process and insert data
    const formattedTransactions = transactions.map(transaction => ({
      ...transaction,
      dateOfSale: new Date(transaction.dateOfSale)
    }));

    await Transaction.insertMany(formattedTransactions);

    return res.status(201).json({
      success: true,
      message: `Database initialized with ${formattedTransactions.length} transactions`,
      count: formattedTransactions.length
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to initialize database',
      error: error.message
    });
  }
};