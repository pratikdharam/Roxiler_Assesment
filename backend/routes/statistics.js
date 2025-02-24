const express = require('express');
const { getStatistics } = require('../controllers/statisticsController');

const router = express.Router();

// @route   GET /api/statistics
// @desc    Get statistics for a selected month
// @access  Public
router.get('/', getStatistics);

module.exports = router;