const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/statistics', require('./routes/statistics'));
app.use('/api/bar-chart', require('./routes/barChart'));
app.use('/api/pie-chart', require('./routes/pieChart'));
app.use('/api/combined', require('./routes/combined'));
app.use('/api/initialize-db', require('./routes/initialize'));

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});