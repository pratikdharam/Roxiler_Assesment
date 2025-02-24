const express = require('express');
const { getCombinedData } = require('../controllers/combinedController');

const router = express.Router();

// @route   GET /api/combined
// @desc    Get combined data from all three APIs
// @access  Public
router.get('/', getCombinedData);

module.exports = router;