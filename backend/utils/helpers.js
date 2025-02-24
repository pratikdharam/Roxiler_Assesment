/**
 * Get month date range for MongoDB query
 * @param {string} month - Month name (January - December)
 * @returns {Object} MongoDB query expression
 */
exports.getMonthDateRange = (month) => {
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    
    const monthIndex = months.findIndex(m => m.toLowerCase() === month.toLowerCase());
    
    if (monthIndex === -1) {
      throw new Error('Invalid month. Please provide a month between January and December.');
    }
    
    return {
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, monthIndex + 1]
      }
    };
  };
  
  /**
   * Format price to currency
   * @param {number} price - Price to format
   * @returns {string} Formatted price
   */
  exports.formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  /**
   * Format date to readable string
   * @param {Date} date - Date to format
   * @returns {string} Formatted date
   */
  exports.formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };