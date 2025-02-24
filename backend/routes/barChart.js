const express = require('express');
const { getBarChartData } = require('../controllers/barChartController');

const router = express.Router();

// @route   GET /api/bar-chart
// @desc    Get bar chart data for a selected month
// @access  Public
router.get('/', getBarChartData);

module.exports = router;