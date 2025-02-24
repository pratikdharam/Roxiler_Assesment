const express = require('express');
const { getTransactions } = require('../controllers/transactionController');

const router = express.Router();

// @route   GET /api/transactions
// @desc    Get transactions with search and pagination
// @access  Public
router.get('/', getTransactions);

module.exports = router;