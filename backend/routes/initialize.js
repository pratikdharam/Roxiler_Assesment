const express = require('express');
const { initializeDatabase } = require('../controllers/initializeController');

const router = express.Router();

// @route   GET /api/initialize-db
// @desc    Initialize database with seed data
// @access  Public
router.get('/', initializeDatabase);

module.exports = router;