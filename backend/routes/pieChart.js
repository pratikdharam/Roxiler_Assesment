const express = require('express');
const { getPieChartData } = require('../controllers/pieChartController');

const router = express.Router();

// @route   GET /api/pie-chart
// @desc    Get pie chart data for a selected month
// @access  Public
router.get('/', getPieChartData);

module.exports = router;