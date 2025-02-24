const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  sold: {
    type: Boolean,
    required: true
  },
  dateOfSale: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Add a text index for search functionality
TransactionSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Transaction', TransactionSchema);